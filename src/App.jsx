/**
 * Main App Component for AI TFL Subdomain
 * Integrates authentication with TFL chat functionality
 * Following migration pattern: selective route protection, not wrapping entire app
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthGuard from './components/AuthGuard.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div 
          className="h-screen overflow-auto flex flex-col"
          style={{ background: 'black' }}
        >
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/chat" 
              element={
                <AuthGuard>
                  <ChatPage />
                </AuthGuard>
              } 
            />
            
            {/* Legacy dashboard route - redirect to chat */}
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <ChatPage />
                </AuthGuard>
              } 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
