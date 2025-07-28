/**
 * About Page for TFL Underground Assistant
 */

import { Train, Info, MapPin, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const tflLines = [
    { name: 'Circle Line', color: '#FFD300', textColor: 'black' },
    { name: 'Bakerloo Line', color: '#B36305', textColor: 'white' },
    { name: 'District Line', color: '#00782A', textColor: 'white' },
    { name: 'Central Line', color: '#E32017', textColor: 'white' },
    { name: 'Northern Line', color: '#000000', textColor: 'white' },
    { name: 'Piccadilly Line', color: '#003688', textColor: 'white' },
    { name: 'Victoria Line', color: '#0098D4', textColor: 'white' },
    { name: 'Jubilee Line', color: '#A0A5A9', textColor: 'white' },
    { name: 'Metropolitan Line', color: '#9B0056', textColor: 'white' },
    { name: 'Hammersmith & City Line', color: '#F3A9BB', textColor: 'black' },
    { name: 'Waterloo & City Line', color: '#95CDBA', textColor: 'black' },
    { name: 'Elizabeth Line', color: '#7156A5', textColor: 'white' },
  ];

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
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
          <p className="text-xl text-gray-300">
            Your intelligent guide to London Underground services
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Information</h3>
            <p className="text-gray-300">
              Get up-to-date line status, disruptions, and service updates
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Station Information</h3>
            <p className="text-gray-300">
              Find platforms, facilities, and live arrival times
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquarePlus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Journey Planning</h3>
            <p className="text-gray-300">
              Plan your route with step-by-step directions
            </p>
          </div>
        </div>

        {/* Supported Lines */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Supported Underground Lines
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tflLines.map((line, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: line.color }}
                />
                <span className="text-gray-200 font-medium">{line.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Use</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Quick Queries</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Circle line status"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Next trains at King's Cross"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Is the Northern line running?"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Disruptions on Central line"
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Journey Planning</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Camden to Oxford Circus"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Best route to Heathrow"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "How to get to Tower Bridge"
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  "Journey from Paddington to Westminster"
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            to="/chat" 
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            <MessageSquarePlus className="w-6 h-6" />
            Start Chat
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;