/**
 * TFL Chat Interface component with new visual styling
 * Preserves all existing functionality while using new UI components
 */
import ChatMessages from './chat/ChatMessages';
import ChatInput from './chat/ChatInput';
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

  return (
    <main className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 overflow-auto">
        <ChatMessages />
      </div>
      <ChatInput onSendMessage={sendMessage} isLoading={loading} />
    </main>
  );
};

export default TFLChatInterface;