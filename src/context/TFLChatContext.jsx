/**
 * TFL Chat Context for managing TFL Underground chat state
 * Simplified version adapted from ai-tutor ChatContext
 */
import {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import tflApi from '../services/tflApi';

// Create the context
const TFLChatContext = createContext();

// Custom hook for using the TFL chat context
export const useTFLChat = () => {
  const context = useContext(TFLChatContext);
  if (!context) {
    throw new Error('useTFLChat must be used within a TFLChatProvider');
  }
  return context;
};

// TFL Chat provider component
export const TFLChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [lineColor, setLineColor] = useState(null);

  // Function to send a message to the TFL API
  const sendMessage = useCallback(
    async (messageText) => {
      setLoading(true);
      setError(null);

      try {
        // Add user message to the chat
        const userMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: messageText,
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Call the TFL API
        const response = await tflApi.chat(messageText, threadId, {});

        // Save the thread ID for conversation continuity
        if (response.threadId) {
          setThreadId(response.threadId);
        }

        // Update current agent and line color
        if (response.agent) {
          setCurrentAgent(response.agent);
        }
        if (response.lineColor) {
          setLineColor(response.lineColor);
        }

        // Add TFL response to the chat
        const tflMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.response,
          agent: response.agent,
          lineColor: response.lineColor,
          confidence: response.confidence,
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, tflMessage]);
        return response;
      } catch (err) {
        setError('Failed to send message. Please try again.');
        console.error('Error in TFL sendMessage:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [threadId],
  );

  // Function to clear the conversation
  const clearChat = useCallback(() => {
    setMessages([]);
    setThreadId(null);
    setError(null);
    setCurrentAgent(null);
    setLineColor(null);
  }, []);

  // The value object passed to the provider
  const value = {
    messages,
    loading,
    error,
    threadId,
    currentAgent,
    lineColor,
    sendMessage,
    clearChat,
  };

  return (
    <TFLChatContext.Provider value={value}>
      {children}
    </TFLChatContext.Provider>
  );
};

export default TFLChatContext;