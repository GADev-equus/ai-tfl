/**
 * TFL Chat Message component for rendering individual TFL messages
 * Based on ai-tutor ChatMessage but adapted for TFL functionality
 */
import PropTypes from 'prop-types';

const TFLChatMessage = ({ message }) => {
  // Determine if the message is from the TFL assistant or user
  const isAssistant = message.role === 'assistant';

  // Format the timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Get tube line colors for styling
  const getLineStyle = (lineColor) => {
    if (!lineColor) return {};
    return {
      borderLeft: `4px solid ${lineColor}`,
      paddingLeft: '12px'
    };
  };

  return (
    <div
      className={`d-flex ${
        isAssistant ? 'justify-content-start' : 'justify-content-end'
      } mb-3`}
    >
      <div
        className={`message p-3 rounded shadow-sm ${
          isAssistant ? 'message-assistant bg-light' : 'message-user bg-primary text-white'
        }`}
        style={{ 
          maxWidth: '80%',
          ...getLineStyle(message.lineColor)
        }}
      >
        {/* Message header with role and agent info for TFL assistant */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold">
            {isAssistant ? 'TFL Assistant' : 'You'}
            {isAssistant && message.agent && (
              <span 
                className="badge ms-2 text-white"
                style={{ 
                  backgroundColor: message.lineColor || '#0019a8',
                  fontSize: '0.7em'
                }}
              >
                {message.agent.replace('Agent', ' Line')}
              </span>
            )}
          </span>
          <small className={isAssistant ? 'text-muted' : 'text-white-50'}>
            {formattedTime}
          </small>
        </div>

        {/* Message content */}
        <div className="mt-2">
          <div className="message-content">
            {message.content.split('\n').map((line, index) => (
              <p key={index} className="m-0 mb-1">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Confidence indicator for assistant messages */}
        {isAssistant && message.confidence && (
          <div className="mt-2">
            <small className="text-muted">
              Confidence: {Math.round(message.confidence * 100)}%
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

TFLChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    agent: PropTypes.string,
    lineColor: PropTypes.string,
    confidence: PropTypes.number,
  }).isRequired,
};

export default TFLChatMessage;