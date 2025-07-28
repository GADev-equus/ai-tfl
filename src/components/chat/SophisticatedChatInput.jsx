import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Loader2,
  Lightbulb,
  X,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useConversation } from '../../contexts/ConversationContext';
import { tflApi } from '../../services/tflApi';
import ConfirmationDialog from './ConfirmationDialog';
import StreamingIndicator from './StreamingIndicator';

export default function SophisticatedChatInput() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingData, setStreamingData] = useState(null);
  const [useStreamingMode, setUseStreamingMode] = useState(false);
  const inputRef = useRef(null);
  const {
    addMessage,
    setLoading,
    setError,
    setActiveAgent,
    setTypingIndicator,
    threadId,
    isLoading,
  } = useConversation();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Listen for custom events to set input message
  useEffect(() => {
    const handleSetInputMessage = (event) => {
      setMessage(event.detail.message);
      inputRef.current?.focus();
    };

    window.addEventListener('setInputMessage', handleSetInputMessage);
    return () =>
      window.removeEventListener('setInputMessage', handleSetInputMessage);
  }, []);

  // Example questions organized by category
  const exampleQuestions = {
    'Line Status': [
      'Circle line current status',
      'Bakerloo line disruptions today',
      'What is the status of District line?',
      'Central line service status',
    ],
    Disruptions: [
      'Are there any disruptions on Bakerloo line?',
      'Current delays on Circle line?',
      'District line closures this weekend',
      'Planned engineering works',
    ],
    'Journey Planning': [
      'Plan a journey from Paddington to Westminster',
      "Best route from King's Cross to Victoria",
      'How to get from Baker Street to Liverpool Street',
      'Journey time from Edgware Road to Monument',
    ],
    'Station Information': [
      'District line station information',
      'Tell me about Notting Hill Gate station',
      'Platform information for Baker Street',
      'Accessibility at Westminster station',
    ],
  };

  const handleExampleClick = (example) => {
    setMessage(example);
    setShowExamples(false);
    inputRef.current?.focus();
  };

  // Responsive placeholder text
  const getPlaceholderText = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'Ask about TFL services...';
    }
    return 'Ask about any TFL line, station, journey planning, or service updates...';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isSending || isLoading) {
      return;
    }

    const userMessage = message.trim();
    setMessage('');
    setIsSending(true);

    // Add user message immediately
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    // Determine whether to use streaming mode
    const shouldStream = useStreamingMode || detectComplexQuery(userMessage);

    if (shouldStream) {
      await handleStreamingSubmit(userMessage);
    } else {
      await handleRegularSubmit(userMessage);
    }
  };

  // Detect complex queries that benefit from streaming
  const detectComplexQuery = (query) => {
    const complexPatterns = [
      /journey from .+ to/i,
      /plan.*route/i,
      /how to get from/i,
      /best way to/i,
      /compare/i,
      /multiple lines/i,
      /all lines/i,
      /network status/i,
    ];
    return complexPatterns.some(pattern => pattern.test(query));
  };

  // Handle streaming submission with workflow progress
  const handleStreamingSubmit = async (userMessage) => {
    try {
      console.log('Starting streaming mode for:', userMessage);
      
      setIsStreaming(true);
      setLoading(true);
      setTypingIndicator(true);

      // Create event source for streaming
      const eventSource = tflApi.streamMessage(userMessage, threadId, {});

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Streaming data received:', data);

          // Update streaming progress
          setStreamingData({
            step: data.step,
            agent: data.agent,
            partialResponse: data.partialResponse,
          });

          // If we have a final response, add it
          if (data.partialResponse && data.step === 'finalize_response') {
            addMessage({
              role: 'assistant',
              content: data.partialResponse,
              agent: data.agent,
              streaming: true,
              timestamp: data.metadata?.timestamp || new Date().toISOString(),
            });
            
            // Update active agent
            if (data.agent) {
              setActiveAgent(data.agent);
            }
          }

          // Check if streaming is complete
          if (data.done) {
            setIsStreaming(false);
            setStreamingData(null);
            eventSource.close();
          }
        } catch (parseError) {
          console.error('Error parsing streaming data:', parseError);
        }
      };

      eventSource.onerror = (error) => {
        console.error('Streaming error:', error);
        setError('Streaming connection failed. Falling back to standard mode...');

        // Fallback to regular request
        handleRegularSubmit(userMessage);

        setIsStreaming(false);
        setStreamingData(null);
        eventSource.close();
      };
    } catch (error) {
      console.error('Failed to start streaming:', error);
      setError('Failed to start streaming. Using standard mode...');

      // Fallback to regular request
      handleRegularSubmit(userMessage);
    } finally {
      setIsSending(false);
      setLoading(false);
      setTypingIndicator(false);
    }
  };

  // Handle regular (non-streaming) submission
  const handleRegularSubmit = async (userMessage) => {
    try {
      // Set loading and typing indicators
      setLoading(true);
      setTypingIndicator(true);

      // Send message to sophisticated API
      const response = await tflApi.chat(userMessage, threadId);

      // Debug: Log the full response to see what we're getting
      console.log('=== API RESPONSE DEBUG ===');
      console.log('Full response object:', response);
      console.log('requiresConfirmation:', response.requiresConfirmation);
      console.log('awaitingConfirmation:', response.awaitingConfirmation);

      // Update active agent if specified in response
      if (response.agent) {
        setActiveAgent(response.agent);
      }

      // Check if response requires confirmation (human-in-the-loop)
      if (response.requiresConfirmation || response.awaitingConfirmation) {
        // Store the pending confirmation data
        setPendingConfirmation({
          originalMessage: userMessage,
          response: response.response,
          threadId: response.threadId,
          metadata: {
            agent: response.agent,
            confidence: response.confidence,
            timestamp: response.timestamp,
          },
        });

        // Add the confirmation message to conversation
        addMessage({
          role: 'assistant',
          content: response.response,
          agent: response.agent,
          metadata: response.metadata,
          tflData: response.tflData,
          lineColor: response.lineColor,
          requiresConfirmation: true,
          timestamp: response.timestamp || new Date().toISOString(),
        });
      } else {
        // Normal response - add directly to conversation
        addMessage({
          role: 'assistant',
          content: response.response,
          agent: response.agent,
          metadata: response.metadata,
          tflData: response.tflData,
          lineColor: response.lineColor,
          timestamp: response.timestamp || new Date().toISOString(),
        });
      }

      // Clear any existing errors
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
      
      // Add error message to conversation
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or contact TFL customer service for immediate assistance.',
        isError: true,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSending(false);
      setLoading(false);
      setTypingIndicator(false);
    }
  };

  // Handle confirmation response
  const handleConfirmation = async (confirmed) => {
    if (!pendingConfirmation) return;

    try {
      setLoading(true);
      setTypingIndicator(true);

      // Send confirmation to API
      const response = await tflApi.chatWithConfirmation(
        pendingConfirmation.originalMessage,
        pendingConfirmation.threadId,
        confirmed,
        {}
      );

      // Add the confirmed response
      addMessage({
        role: 'assistant',
        content: response.response,
        agent: response.agent,
        metadata: response.metadata,
        confirmed: confirmed,
        timestamp: response.timestamp || new Date().toISOString(),
      });

      // Update active agent
      if (response.agent) {
        setActiveAgent(response.agent);
      }
    } catch (error) {
      console.error('Failed to send confirmation:', error);
      setError(error.message || 'Failed to process confirmation.');
    } finally {
      setPendingConfirmation(null);
      setLoading(false);
      setTypingIndicator(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = isSending || isLoading;

  return (
    <>
      {/* Streaming Indicator */}
      {isStreaming && (
        <StreamingIndicator
          isStreaming={isStreaming}
          currentStep={streamingData?.step}
          agent={streamingData?.agent}
          onClose={() => {
            setIsStreaming(false);
            setStreamingData(null);
          }}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!pendingConfirmation}
        title="Confirm Journey Planning"
        message={
          <div>
            <p className="mb-3">I found a route for your journey. Would you like me to provide detailed directions?</p>
            <div className="bg-gray-700 p-3 rounded text-sm">
              {pendingConfirmation?.response}
            </div>
          </div>
        }
        confirmText="Yes, show directions"
        cancelText="No, just the summary"
        onConfirm={() => handleConfirmation(true)}
        onCancel={() => handleConfirmation(false)}
      />

      {/* Example Questions */}
      {showExamples && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Example Questions</h3>
            <button
              onClick={() => setShowExamples(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {Object.entries(exampleQuestions).map(([category, questions]) => (
            <div key={category} className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">{category}</h4>
              <div className="grid gap-2">
                {questions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Input */}
      <div className="bg-gray-800 border-t border-gray-700 p-3 sm:p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2 sm:gap-3">
            {/* Example Questions Button */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => setShowExamples(!showExamples)}
              className="flex-shrink-0 p-2 sm:p-3 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 border border-gray-600 hover:border-gray-500"
              title="Show example questions"
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Streaming Mode Toggle */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => setUseStreamingMode(!useStreamingMode)}
              className={`flex-shrink-0 p-2 sm:p-3 rounded-md transition-colors disabled:opacity-50 border ${
                useStreamingMode 
                  ? 'text-blue-400 bg-blue-900/20 border-blue-500 hover:bg-blue-900/30' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700 border-gray-600 hover:border-gray-500'
              }`}
              title="Toggle streaming mode for complex queries"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Input Field */}
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholderText()}
                className="textarea-field min-h-[64px] sm:min-h-[72px] max-h-[120px] resize-none text-sm sm:text-base bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                disabled={isDisabled}
                rows={2}
                style={{
                  height: 'auto',
                  minHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? '64px' : '72px',
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={isDisabled || !message.trim()}
              className={`
                flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium transition-all duration-200
                flex items-center justify-center min-w-[50px] sm:min-w-[60px]
                ${
                  isDisabled || !message.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
                }
              `}
            >
              {isLoading || isSending ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}