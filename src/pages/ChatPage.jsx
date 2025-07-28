/**
 * TFL Chat Page - Sophisticated multi-agent TFL Underground chat
 * Now uses global ConversationContext and TFLContext providers
 */
import TFLChatInterface from '../components/TFLChatInterface';

const ChatPage = () => {
  return (
    <main className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 overflow-auto">
        <TFLChatInterface />
      </div>
    </main>
  );
};

export default ChatPage;