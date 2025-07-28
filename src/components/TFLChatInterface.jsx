/**
 * TFL Chat Interface component that combines TFLChatMessage and TFLChatInput
 * Based on ai-tutor ChatInterface but adapted for TFL functionality
 */
import { useRef, useEffect } from 'react';
import TFLChatMessage from './TFLChatMessage';
import TFLChatInput from './TFLChatInput';
import { useTFLChat } from '../context/TFLChatContext';

const TFLChatInterface = () => {
  const {
    messages,
    loading,
    sendMessage,
    clearChat,
    threadId,
    currentAgent,
    lineColor,
    error,
  } = useTFLChat();
  
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-interface card border-0 shadow">
      <div 
        className="card-header text-white d-flex justify-content-between align-items-center"
        style={{ 
          background: lineColor || '#0019a8',
          borderBottom: `3px solid ${lineColor || '#0019a8'}`
        }}
      >
        <div className="d-flex align-items-center">
          <h5 className="m-0">🚇 TFL Underground Assistant</h5>
          {threadId && (
            <span className="badge bg-light text-dark ms-2">
              <small>Chat: {threadId.substring(0, 8)}...</small>
            </span>
          )}
          {currentAgent && (
            <span className="badge bg-white bg-opacity-25 ms-2">
              {currentAgent.replace('Agent', ' Line')}
            </span>
          )}
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={clearChat}
            disabled={loading || messages.length === 0}
            title="Start a new conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="card-body p-0">
        {/* Error Alert */}
        {error && <div className="alert alert-danger m-3">{error}</div>}

        {/* Chat Messages */}
        <div className="chat-container p-3" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="text-center text-muted py-5">
              <div className="mb-3">🚇</div>
              <h4>Welcome to TFL Underground Assistant!</h4>
              <p>
                Ask me about London Underground services, line status, 
                <br />
                station information, or journey planning.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body p-3">
                      <h6 className="card-title">Line Status</h6>
                      <p className="card-text small">
                        "Circle line status"<br/>
                        "Is the Northern line running?"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body p-3">
                      <h6 className="card-title">Station Info</h6>
                      <p className="card-text small">
                        "Next trains at King's Cross"<br/>
                        "Platforms at Baker Street"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body p-3">
                      <h6 className="card-title">Journey Planning</h6>
                      <p className="card-text small">
                        "Camden to Oxford Circus"<br/>
                        "Best route to Heathrow"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <TFLChatMessage key={index} message={message} />
            ))
          )}

          {loading && (
            <div className="text-center my-3">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">TFL Assistant is checking the latest information...</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-top">
          <TFLChatInput onSendMessage={sendMessage} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TFLChatInterface;