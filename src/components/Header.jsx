import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Train,
  Wifi,
  WifiOff,
  AlertCircle,
  MoreVertical,
  MessageSquarePlus,
  Info,
  Home,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ className = '' }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [connectionStatus, setConnectionStatus] = useState('connected'); // Simplified for TFL
  const [showMenu, setShowMenu] = useState(false);

  // Handle menu actions
  const handleMenuAction = (action) => {
    setShowMenu(false);

    switch (action) {
      case 'home':
        navigate('/');
        break;
      case 'chat':
        navigate('/chat');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'logout':
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-600" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-600" />;
      default:
        return (
          <AlertCircle className="w-4 h-4 text-yellow-600 animate-pulse" />
        );
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Offline';
      default:
        return 'Connecting...';
    }
  };

  return (
    <header
      className={`bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg px-4 py-3 sticky top-0 z-50 ${className}`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Branding */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          title="Go to Home"
        >
          {/* TFL Roundel-inspired logo */}
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
              <Train className="w-5 h-5 text-white" />
            </div>
            {/* Connection indicator dot */}
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-800 ${
                connectionStatus === 'connected'
                  ? 'bg-green-500'
                  : connectionStatus === 'disconnected'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
            />
          </div>

          {/* Title and subtitle */}
          <div className="flex flex-col text-center">
            <h1 className="text-lg font-bold text-white tracking-tight hover:text-gray-100 transition-colors">
              TFL{' '}
              <span className="text-cyan-400 font-black text-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                AI
              </span>{' '}
              ASSIST
            </h1>
            <p className="text-xs font-semibold text-cyan-400">
              Powered by Advanced AI
            </p>
          </div>
        </button>

        {/* Right side - User info and Menu */}
        <div className="flex items-center gap-4">
          {/* User welcome message */}
          {isAuthenticated && user && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-200">
              <User className="w-4 h-4" />
              <span>Welcome, {user.firstName || user.username}!</span>
            </div>
          )}

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 py-2">
                  <button
                    onClick={() => handleMenuAction('home')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Home</span>
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={() => handleMenuAction('chat')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                      <span className="font-medium">TFL Chat</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleMenuAction('about')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span className="font-medium">About</span>
                  </button>

                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-600 my-1" />
                      <button
                        onClick={() => handleMenuAction('logout')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  )}

                  <div className="border-t border-gray-600 my-1" />

                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {getConnectionIcon()}
                      <span className="font-medium">{getConnectionText()}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}