/**
 * Home Page for AI TFL
 * Public page that shows app info and login status
 */

import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Train, MessageSquarePlus, Info } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Train className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">🚇 AI TFL</h1>
          <p className="text-gray-400">Loading authentication status...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Train className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                TFL{' '}
                <span className="text-cyan-400 font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>{' '}
                ASSIST
              </h1>
              <p className="text-cyan-400 font-semibold">Powered by Advanced AI</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 mb-8">Your intelligent guide to London Underground services</p>
        </div>
        
        {isAuthenticated ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hello, {user?.firstName || 'User'}! 👋
            </h2>
            <p className="text-gray-300 mb-6">
              Welcome to TFL Underground Assistant! You can now access the full chat interface with real-time TFL data, journey planning, and line status information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-5 h-5" />
                Start TFL Chat 🚇
              </Link>
              <Link 
                to="/about" 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Info className="w-5 h-5" />
                Learn More
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">🔐 Login Required</h2>
            <p className="text-gray-300 mb-6">
              To access the TFL Underground Assistant chat interface, you need to authenticate through the main Equus Systems portal first.
            </p>
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">What you'll get access to:</h3>
              <ul className="text-left text-gray-300 space-y-2">
                <li>🚇 Real-time TFL line status and disruptions</li>
                <li>🗺️ Journey planning across all London Underground lines</li>
                <li>🚉 Live station information and arrival times</li>
                <li>⚡ AI-powered assistance for all TFL queries</li>
                <li>📱 Mobile-optimized chat interface</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <a 
                href="https://equussystems.co/auth/signin" 
                className="btn-primary text-lg py-3"
              >
                Login via Equus Systems
              </a>
              <Link 
                to="/about" 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Info className="w-5 h-5" />
                Learn More About TFL Assistant
              </Link>
            </div>
          </div>
        )}

        {/* Features preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Info</h3>
            <p className="text-gray-400 text-sm">
              Get up-to-date line status, disruptions, and service updates
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Train className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Station Info</h3>
            <p className="text-gray-400 text-sm">
              Find platforms, facilities, and live arrival times
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquarePlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Journey Planning</h3>
            <p className="text-gray-400 text-sm">
              Plan your route with step-by-step directions
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}