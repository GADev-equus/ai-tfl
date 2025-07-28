/**
 * TFL Chat Page - Main page for TFL Underground chat functionality
 * Based on ai-tutor ChatPage but adapted for TFL
 */
import TFLChatInterface from '../components/TFLChatInterface';
import { TFLChatProvider } from '../context/TFLChatContext';

const ChatPage = () => {
  return (
    <TFLChatProvider>
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 overflow-auto">
          <TFLChatInterface />
        </div>
      </main>
    </TFLChatProvider>
  );
};

export default ChatPage;