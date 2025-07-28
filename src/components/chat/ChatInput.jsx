import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Lightbulb } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

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

  // Responsive placeholder text
  const getPlaceholderText = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'Ask about TFL services...';
    }
    return 'Ask about any TFL line, station, journey planning, or service updates...';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) {
      return;
    }

    const userMessage = message.trim();
    setMessage('');
    
    // Call the existing onSendMessage function
    onSendMessage(userMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = isLoading;

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-3 sm:p-4 flex-shrink-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-2 sm:gap-3">
          {/* Example button */}
          <button
            type="button"
            disabled={isDisabled}
            className="flex-shrink-0 p-2 sm:p-3 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 border border-gray-600 hover:border-gray-500"
            title="Show example questions"
          >
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
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
            {isLoading ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}