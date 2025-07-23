/**
 * Main App Component for AI TFL Subdomain
 * Integrates authentication with routing
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthGuard from './components/AuthGuard.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedPage from './pages/ProtectedPage.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <ProtectedPage />
                </AuthGuard>
              } 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
