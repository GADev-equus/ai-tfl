/**
 * TFL Chat Page - Main page for TFL Underground chat functionality
 * Based on ai-tutor ChatPage but adapted for TFL
 */
import TFLChatInterface from '../components/TFLChatInterface';
import { TFLChatProvider } from '../context/TFLChatContext';

const ChatPage = () => {
  return (
    <TFLChatProvider>
      <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <TFLChatInterface />
          </div>
        </div>
      </div>
    </TFLChatProvider>
  );
};

export default ChatPage;