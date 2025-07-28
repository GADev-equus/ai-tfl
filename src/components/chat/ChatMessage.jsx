import { format } from 'date-fns';
import { User, Bot, Clock, AlertTriangle } from 'lucide-react';

// Simple content renderer that preserves existing functionality
const renderFormattedContent = (content) => {
  if (!content || typeof content !== 'string') {
    return <span className="text-red-500">No content available</span>;
  }

  // Split content into lines and process each line
  const lines = content.split('\n');

  return lines.map((line, index) => {
    // Skip empty lines
    if (!line.trim()) {
      return <div key={index} className="h-2" />;
    }

    // Handle markdown headers (### Header)
    if (line.trim().startsWith('###')) {
      const headerText = line.trim().replace(/^###\s*/, '');
      return (
        <h3
          key={index}
          className="font-bold text-lg sm:text-xl mb-3 mt-4 text-blue-400 break-words"
        >
          {headerText}
        </h3>
      );
    }

    // Handle headers with **text**
    if (line.includes('**') && line.indexOf('**') !== line.lastIndexOf('**')) {
      const parts = line.split('**');
      return (
        <div key={index} className="mb-2 sm:mb-3">
          {parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              return (
                <strong
                  key={partIndex}
                  className="font-semibold text-base sm:text-lg text-blue-300 break-words"
                >
                  {part}
                </strong>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    }

    // Handle bullet points
    if (line.trim().startsWith('- ')) {
      const bulletText = line.trim().substring(2);
      return (
        <div key={index} className="flex items-start gap-2 mb-2 ml-4 sm:ml-6">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 flex-shrink-0 rounded-full bg-blue-400" />
          <span className="text-sm leading-relaxed break-words text-gray-200">
            {bulletText}
          </span>
        </div>
      );
    }

    // Regular paragraphs
    return (
      <p
        key={index}
        className="mb-2 text-sm leading-relaxed text-gray-200 break-words"
      >
        {line}
      </p>
    );
  });
};

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const isError = message.isError;

  const formatTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm');
    } catch {
      return '';
    }
  };

  const getMessageClasses = () => {
    if (isUser) {
      return 'chat-message user';
    }

    if (isError) {
      return 'chat-message assistant bg-red-900 border-red-700 text-red-100';
    }

    return 'chat-message assistant';
  };

  const getIcon = () => {
    if (isUser) {
      return <User className="w-5 h-5" />;
    }

    if (isError) {
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }

    return <Bot className="w-5 h-5" />;
  };

  return (
    <div>
      {!isUser && (
        <div className={getMessageClasses()}>
          <div className="message-content">
            {renderFormattedContent(message.content)}
          </div>
          {/* Timestamp */}
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>
      )}

      {isUser && (
        <div className="flex gap-2 sm:gap-3 justify-end">
          <div className={getMessageClasses()}>
            <div className="message-content">
              {renderFormattedContent(message.content)}
            </div>
            {/* Timestamp */}
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{formatTime(message.timestamp)}</span>
            </div>
          </div>
          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 text-white flex items-center justify-center">
            {getIcon()}
          </div>
        </div>
      )}
    </div>
  );
}