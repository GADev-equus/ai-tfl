/**
 * Home Page for AI TFL
 * Public page that shows app info and login status
 */

import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h1>🚇 AI TFL</h1>
        <p>Loading authentication status...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 mb-4">🚇 AI TFL Assistant</h1>
          <p className="lead mb-4">Your intelligent guide to London Underground services</p>
          
          {isAuthenticated ? (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Hello, {user?.firstName || 'User'}!</h2>
                <p className="card-text">You are authenticated and can access the TFL Underground Assistant.</p>
                <div className="d-grid gap-2 d-md-block">
                  <Link to="/chat" className="btn btn-primary btn-lg me-md-2">
                    Start Chat 🚇
                  </Link>
                  <Link to="/about" className="btn btn-outline-secondary btn-lg me-md-2">
                    Learn More
                  </Link>
                  <button onClick={logout} className="btn btn-outline-danger">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Authentication Required</h2>
                <p className="card-text">Please log in at the main site to access AI TFL features.</p>
                <div className="d-grid gap-2">
                  <a href="https://equussystems.co/auth/signin" className="btn btn-primary btn-lg">
                    Go to Login
                  </a>
                  <Link to="/about" className="btn btn-outline-secondary">
                    Learn More About TFL Assistant
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}