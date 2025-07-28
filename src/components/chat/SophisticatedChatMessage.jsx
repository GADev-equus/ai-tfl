import { format } from 'date-fns';
import { User, Bot, Clock, AlertTriangle } from 'lucide-react';
import { useTFL } from '../../contexts/TFLContext';

// Utility function to strip any HTML tags and render clean markdown
const stripHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};

// Utility function to render markdown-like formatting with line colors
const renderFormattedContent = (
  content,
  lineColor,
  isNetworkStatus = false,
) => {
  if (!content || typeof content !== 'string') {
    return <span className="text-red-500">No content available</span>;
  }

  // Strip any HTML tags first for security and cleanliness
  const cleanContent = stripHtmlTags(content);

  // Special handling for Network Status messages
  if (isNetworkStatus) {
    return renderNetworkStatusContent(cleanContent, lineColor);
  }

  // Split content into lines and process each line
  const lines = cleanContent.split('\n');

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

    // Handle markdown headers (## Header)
    if (line.trim().startsWith('##')) {
      const headerText = line.trim().replace(/^##\s*/, '');
      return (
        <h2
          key={index}
          className="font-bold text-xl sm:text-2xl mb-3 mt-4 text-blue-300 break-words"
        >
          {headerText}
        </h2>
      );
    }

    // Handle markdown headers (# Header)
    if (line.trim().startsWith('#')) {
      const headerText = line.trim().replace(/^#\s*/, '');
      return (
        <h1
          key={index}
          className="font-bold text-2xl sm:text-3xl mb-4 mt-4 text-blue-200 break-words"
        >
          {headerText}
        </h1>
      );
    }

    // Handle headers with **text**
    if (line.includes('**') && line.indexOf('**') !== line.lastIndexOf('**')) {
      const parts = line.split('**');
      return (
        <div key={index} className="mb-2 sm:mb-3">
          {parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              // This is bold text - check if it's a line name for special styling
              const isLineName = part.includes('Line');

              if (isLineName) {
                return (
                  <h3
                    key={partIndex}
                    className="font-bold text-xl sm:text-2xl mb-1 break-words"
                    style={{ color: lineColor?.primary || '#60a5fa' }}
                  >
                    {part}
                  </h3>
                );
              }

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

    // Handle special formatted fields with colons - improved for network status
    if (line.includes(':') && !line.trim().startsWith('http')) {
      const [label, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();

      // Special styling for specific fields
      const isImportantField = [
        'ID',
        'Status Severity Description',
        'Status Severity',
        'Reason',
        'Validity Periods',
        'Disruption Description',
        'Travel Advice',
        'Route',
        'Operating Hours',
        'Frequency',
      ].some((field) => label.trim().includes(field));

      return (
        <div
          key={index}
          className={`mb-3 flex flex-col gap-1 ${
            isImportantField ? 'bg-gray-700/30 p-2 rounded' : ''
          }`}
        >
          <span className="font-semibold text-blue-300 text-sm break-words">
            {label.trim()}:
          </span>
          <span className="text-gray-100 text-sm leading-relaxed pl-2 break-words">
            {value}
          </span>
        </div>
      );
    }

    // Handle bullet points with line color
    if (line.trim().startsWith('- ')) {
      const bulletText = line.trim().substring(2);

      // Check if this bullet point contains field information
      if (bulletText.includes(':')) {
        const [bulletLabel, ...bulletValueParts] = bulletText.split(':');
        const bulletValue = bulletValueParts.join(':').trim();

        return (
          <div
            key={index}
            className="flex flex-col gap-1 mb-3 ml-4 sm:ml-6 bg-gray-700/20 p-2 rounded"
          >
            <div className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: lineColor?.primary || '#60a5fa' }}
              ></span>
              <span className="font-semibold text-blue-300 text-sm break-words">
                {bulletLabel.trim()}:
              </span>
            </div>
            <span className="text-gray-100 text-sm leading-relaxed ml-4 break-words">
              {bulletValue}
            </span>
          </div>
        );
      }

      return (
        <div key={index} className="flex items-start gap-2 mb-2 ml-4 sm:ml-6">
          <span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: lineColor?.primary || '#60a5fa' }}
          ></span>
          <span className="text-sm leading-relaxed break-words text-gray-200">
            {bulletText}
          </span>
        </div>
      );
    }

    // Handle numbered lists with line colors
    if (/^\d+\./.test(line.trim())) {
      const numberMatch = line.trim().match(/^\d+\./)[0];
      const listText = line.trim().replace(/^\d+\.\s*/, '');

      return (
        <div
          key={index}
          className="mb-3 ml-4 sm:ml-6 flex items-start gap-3 bg-gray-700/20 p-2 rounded"
        >
          <span
            className="font-bold text-sm flex-shrink-0 min-w-[24px] h-6 flex items-center justify-center rounded-full text-white"
            style={{ backgroundColor: lineColor?.primary || '#60a5fa' }}
          >
            {numberMatch.replace('.', '')}
          </span>
          <span className="text-sm leading-relaxed break-words text-gray-200">
            {listText}
          </span>
        </div>
      );
    }

    // Handle lines that are just separators
    if (line.trim() === '---' || line.trim() === '***') {
      return <hr key={index} className="my-4 border-gray-600" />;
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

// Specialized renderer for Network Status content
const renderNetworkStatusContent = (content, lineColor) => {
  const lines = content.split('\n');

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      return <div key={index} className="h-2" />;
    }

    // Handle the main title
    if (trimmedLine.includes('London Underground Network Status Update')) {
      return (
        <div key={index} className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-200 mb-2">
            🚇 London Underground Network Status Update
          </h1>
        </div>
      );
    }

    // Handle Last Updated timestamp
    if (trimmedLine.startsWith('Last Updated:')) {
      const timestamp = trimmedLine.replace('Last Updated:', '').trim();
      return (
        <div key={index} className="mb-4 p-2 bg-gray-700/30 rounded">
          <span className="text-xs font-medium text-blue-300">
            Last Updated:{' '}
          </span>
          <span className="text-xs text-gray-300">{timestamp}</span>
        </div>
      );
    }

    // Handle markdown headers
    if (trimmedLine.startsWith('###')) {
      const currentSection = trimmedLine.replace(/^###\s*/, '');
      return (
        <div key={index} className="mt-6 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-yellow-400 bg-gray-700/50 p-2 rounded">
            📋 {currentSection}
          </h2>
        </div>
      );
    }

    // Regular text processing...
    return (
      <p key={index} className="mb-2 text-sm leading-relaxed text-gray-200">
        {trimmedLine}
      </p>
    );
  });
};

export default function SophisticatedChatMessage({ message }) {
  const { getLineColor, getLineInfo, normalizeAgentName } = useTFL();

  const isUser = message.role === 'user';
  const isError = message.isError;
  const agent = message.agent;

  // Get line-specific styling if agent is specified
  const lineColor = agent ? getLineColor(agent) : null;
  const lineInfo = agent ? getLineInfo(agent) : null;

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

    if (agent) {
      const normalizedAgent = normalizeAgentName(agent);
      return `chat-message assistant ${normalizedAgent}`;
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

  const getAgentInfo = () => {
    if (!agent || isUser) return null;

    return (
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base sm:text-lg">{lineInfo?.icon}</span>
        <span className="text-xs sm:text-sm font-medium opacity-75 break-words">
          {lineInfo?.name} Assistant
        </span>
      </div>
    );
  };

  return (
    <div>
      {!isUser && (
        <>
          {/* Agent indicator above card for all screen sizes */}
          {getAgentInfo()}

          {/* Full-width message card */}
          <div className={getMessageClasses()}>
            <div className="message-content">
              {renderFormattedContent(
                message.content,
                lineColor,
                agent === 'status' ||
                  (message.content &&
                    message.content.includes('Network Status')),
              )}
            </div>
            {/* TFL Data display */}
            {message.tflData && (
              <div className="mt-3 p-2 sm:p-3 bg-gray-700 border border-gray-600">
                <div className="text-xs font-medium text-gray-300 mb-2">
                  TFL Data:
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  {message.tflData.line && (
                    <div className="break-words">
                      Line: {message.tflData.line.name}
                    </div>
                  )}
                  {message.tflData.status && (
                    <div className="break-words">
                      Status:{' '}
                      {message.tflData.status[0]?.statusSeverityDescription}
                    </div>
                  )}
                  {message.tflData.lastUpdated && (
                    <div className="break-words">
                      Updated:{' '}
                      {new Date(
                        message.tflData.lastUpdated,
                      ).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Timestamp */}
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{formatTime(message.timestamp)}</span>
            </div>
          </div>
        </>
      )}

      {isUser && (
        <div className="flex gap-2 sm:gap-3 justify-end">
          <div className={getMessageClasses()}>
            <div className="message-content">
              {renderFormattedContent(message.content, lineColor)}
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