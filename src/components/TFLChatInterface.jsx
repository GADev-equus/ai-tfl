/**
 * TFL Chat Interface component using sophisticated multi-agent system
 * Integrates with ConversationContext and TFLContext for advanced features
 */
import ChatMessages from './chat/ChatMessages';
import SophisticatedChatInput from './chat/SophisticatedChatInput';

const TFLChatInterface = () => {
  return (
    <main className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 overflow-auto">
        <ChatMessages />
      </div>
      <SophisticatedChatInput />
    </main>
  );
};

export default TFLChatInterface;