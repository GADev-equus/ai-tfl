/**
 * Protected Page for AI TFL
 * Only accessible to authenticated users
 */

import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProtectedPage() {
  const { user, logout } = useAuth();

  return (
    <div className="page">
      <h1>AI TFL Dashboard</h1>
      <p>This is a protected page only accessible to authenticated users.</p>
      
      <div className="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <div className="tutor-features">
        <h2>AI TFL Features</h2>
        <ul>
          <li>Real-time Transport Updates</li>
          <li>Journey Planning Assistant</li>
          <li>Service Disruption Alerts</li>
          <li>Accessibility Information</li>
          <li>Route Optimization</li>
        </ul>
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}