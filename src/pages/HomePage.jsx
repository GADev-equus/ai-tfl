/**
 * Home Page for AI TFL
 * Public page that shows app info and login status
 */

import { useAuth } from '../contexts/AuthContext.jsx';

export default function HomePage() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="page">
        <h1>AI TFL</h1>
        <p>Loading authentication status...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Welcome to AI TFL</h1>
      <p>Transport for London AI Assistant</p>
      
      {isAuthenticated ? (
        <div className="auth-status">
          <h2>Hello, {user?.firstName || 'User'}!</h2>
          <p>You are authenticated and can access protected features.</p>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-status">
          <h2>Authentication Required</h2>
          <p>Please log in at the main site to access AI TFL features.</p>
          <a href="https://equussystems.co/auth/signin" className="login-link">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}