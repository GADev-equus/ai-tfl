/**
 * TFL Chat Input component for sending TFL Underground queries
 * Based on ai-tutor ChatInput but adapted for TFL functionality
 */
import { useState } from 'react';
import PropTypes from 'prop-types';

const TFLChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ask about London Underground... (e.g. 'Circle line status' or 'Next trains at Baker Street')"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Sending...
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
      <div className="form-text mt-2">
        <small className="text-muted">
          Try: "Circle line status", "Next trains at King's Cross", or "Journey from Camden to Oxford Circus"
        </small>
      </div>
    </form>
  );
};

TFLChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

TFLChatInput.defaultProps = {
  isLoading: false,
};

export default TFLChatInput;