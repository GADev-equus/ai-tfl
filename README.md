# TFL AI Chat Application 🚇

A sophisticated Transport for London (TFL) AI assistant with multi-agent system, real-time data integration, and advanced chat capabilities.

## 🌟 Features

### 🤖 Advanced AI System
- **14 Specialized TFL Line Agents**: Individual GPT-4o powered agents for each Underground line
- **Multi-Agent Architecture**: LangGraph workflow orchestration with StateGraph execution
- **Human-in-the-Loop**: Confirmations for journey planning and complex queries
- **Streaming Responses**: Real-time message delivery via Server-Sent Events (SSE)
- **Context Awareness**: Persistent conversation history with localStorage integration

### 🎨 Superior User Experience
- **Dynamic Line Colors**: Messages styled with official TFL line colors based on active agent
- **TypewriterText Animations**: Smooth status update animations for disruptions
- **Speech Recognition**: Web Speech API + Whisper integration for voice input
- **Mobile-First Design**: Fully responsive with touch optimizations and hardware acceleration
- **TFL Official Branding**: Authentic Transport for London visual design and colors

### 🔐 Secure Authentication
- **JWT Integration**: Secure token-based authentication with the main Equus backend
- **Protected Routes**: Login required to access chat functionality
- **Role-Based Access**: Different permissions for user types
- **Cross-Domain Security**: Secure token validation and session management

### 📊 Real-Time TFL Data
- **Live Tube Status**: Direct integration with official Transport for London API
- **Status Indicators**: Color-coded line status with disruption details
- **Real-Time Updates**: Automatic refresh of tube line conditions
- **Visual Status Display**: Professional status blocks with animations

## 🏗️ Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and context API
- **Vite**: Fast development server and build tool
- **Tailwind CSS v3**: Utility-first CSS with TFL custom color system
- **Lucide React**: Beautiful icons and visual elements
- **React Router DOM**: Client-side routing with protected routes

### AI Integration
- **GPT-4o Models**: Advanced language models for each TFL line agent
- **LangGraph**: Workflow orchestration and state management
- **Custom Prompts**: Specialized prompts for each Underground line
- **Streaming API**: Real-time response delivery with progress indicators

### Authentication System
- **JWT Tokens**: Secure authentication with the main Equus API
- **AuthContext**: React context for global authentication state
- **Protected Components**: AuthGuard wrapper for secure routes
- **Session Management**: Automatic token refresh and validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- Main Equus API backend running on port 8000
- npm or yarn package manager

### Installation

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd equus-website/ai-tfl

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Server
The application will be available at:
- **Development**: http://localhost:5173
- **Production**: https://ai-tfl.equussystems.co

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Deploy to hosting service
# (Render.com, Netlify, Vercel, etc.)
```

## 📁 Project Structure

```
ai-tfl/
├── src/
│   ├── components/
│   │   ├── auth/                  # Authentication components
│   │   ├── chat/                  # Advanced chat system
│   │   │   ├── SophisticatedChatInput.jsx     # Streaming input with speech
│   │   │   ├── SophisticatedChatMessage.jsx   # Dynamic line-colored messages
│   │   │   ├── ChatMessages.jsx               # Message container
│   │   │   └── AgentIndicator.jsx             # Active agent display
│   │   ├── ui/                    # UI components
│   │   │   ├── TypewriterText.jsx             # Status animations
│   │   │   └── LineStatusBlock.jsx            # TFL status display
│   │   └── layout/
│   │       └── Header.jsx                     # Navigation with auth
│   ├── contexts/
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── ConversationContext.jsx # Chat management
│   │   └── TFLContext.jsx          # TFL line data and colors
│   ├── hooks/                     # Custom React hooks
│   │   ├── useSpeechRecognition.js            # Web Speech API
│   │   └── useWhisperSpeechRecognition.js     # Whisper integration
│   ├── services/
│   │   ├── tflApi.js              # Multi-agent API service
│   │   └── tflService.js          # Real TFL API integration
│   ├── pages/                     # Route components
│   └── styles/
│       ├── index.css              # TFL styling system
│       └── ChatMessages.css       # Chat-specific styles
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # TFL color system
└── vite.config.js                 # Vite configuration
```

## 🎨 TFL Color System

The application uses official Transport for London colors:

```javascript
// Official TFL Line Colors
{
  circle: '#ffd329',        // Circle Line (Yellow)
  bakerloo: '#894e24',      // Bakerloo Line (Brown)
  district: '#007934',      // District Line (Green)
  central: '#e32017',       // Central Line (Red)
  northern: '#000000',      // Northern Line (Black)
  piccadilly: '#003688',    // Piccadilly Line (Blue)
  victoria: '#0098d4',      // Victoria Line (Light Blue)
  jubilee: '#a0a5a9',       // Jubilee Line (Gray)
  metropolitan: '#9b0056',  // Metropolitan Line (Magenta)
  'hammersmith-city': '#f3a9bb', // Hammersmith & City (Pink)
  'waterloo-city': '#95cdba',     // Waterloo & City (Turquoise)
  elizabeth: '#7156a5'      // Elizabeth Line (Purple)
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the ai-tfl root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_TFL_API_URL=https://api.tfl.gov.uk

# Development Settings
VITE_NODE_ENV=development
```

### Production Configuration
For production deployment:

```env
# Production API
VITE_API_BASE_URL=https://equus-api.onrender.com/api
VITE_TFL_API_URL=https://api.tfl.gov.uk

# Production Settings
VITE_NODE_ENV=production
```

## 🚇 TFL AI Agents

The system includes 14 specialized agents, each expert in their respective Underground line:

1. **Circle Line Agent** - Yellow line expertise
2. **Bakerloo Line Agent** - Brown line expertise  
3. **District Line Agent** - Green line expertise
4. **Central Line Agent** - Red line expertise
5. **Northern Line Agent** - Black line expertise
6. **Piccadilly Line Agent** - Blue line expertise
7. **Victoria Line Agent** - Light blue line expertise
8. **Jubilee Line Agent** - Gray line expertise
9. **Metropolitan Line Agent** - Magenta line expertise
10. **Hammersmith & City Agent** - Pink line expertise
11. **Waterloo & City Agent** - Turquoise line expertise
12. **Elizabeth Line Agent** - Purple line expertise
13. **DLR Agent** - Docklands Light Railway expertise
14. **General TFL Agent** - Overall transport expertise

## 🎙️ Speech Recognition

The application supports voice input through two systems:

### Web Speech API
- **Browser Integration**: Built-in browser speech recognition
- **Real-time Processing**: Immediate voice-to-text conversion
- **Language Support**: English (UK) optimized for London accents
- **Automatic Punctuation**: Smart punctuation insertion

### Whisper Integration
- **AI-Powered**: OpenAI Whisper model for enhanced accuracy
- **Local Processing**: Client-side speech processing with @xenova/transformers
- **Fallback System**: Graceful degradation if Web Speech API unavailable
- **Multiple Languages**: Support for various languages and accents

## 📱 Mobile Optimization

### Touch Interactions
- **44px Touch Targets**: Accessibility-compliant touch areas
- **Gesture Support**: Swipe and tap optimizations
- **Hardware Acceleration**: Smooth animations and scrolling
- **Touch Feedback**: Visual feedback for interactions

### Responsive Design
- **Mobile-First**: Designed for mobile screens first
- **Breakpoint System**: Tailored layouts for different screen sizes
- **Flexible Typography**: Scalable text for readability
- **Optimized Images**: Compressed assets for fast loading

## 🔒 Security Features

### Authentication Security
- **JWT Validation**: Secure token verification with the main API
- **Protected Routes**: AuthGuard components for sensitive areas
- **Session Management**: Automatic token refresh and cleanup
- **CORS Protection**: Proper cross-origin request handling

### Data Security
- **Input Sanitization**: All user inputs validated and sanitized
- **No Sensitive Logging**: Secure handling of authentication data
- **HTTPS Enforcement**: Secure communication protocols
- **Rate Limiting**: Protection against abuse via main API

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication flow (login/logout)
- [ ] Chat functionality with AI responses
- [ ] Speech recognition (voice input)
- [ ] Mobile responsiveness across devices
- [ ] TFL status display with live data
- [ ] Dynamic message coloring by line
- [ ] Header navigation and menu functionality
- [ ] Conversation persistence across sessions
- [ ] Error handling and recovery scenarios

### Performance Testing
- [ ] Page load times under 3 seconds
- [ ] Smooth scrolling and animations
- [ ] Memory usage optimization
- [ ] Bundle size analysis
- [ ] Mobile performance metrics

## 🚀 Deployment

### Render.com Deployment
The application is deployed on Render.com with the following configuration:

```yaml
# render.yaml
services:
  - type: web
    name: ai-tfl
    env: node
    buildCommand: npm run build
    startCommand: npm run preview
    envVars:
      - key: VITE_API_BASE_URL
        value: https://equus-api.onrender.com/api
```

### Manual Deployment Steps
1. Build the application: `npm run build`
2. Upload dist/ folder to hosting service
3. Configure environment variables
4. Set up custom domain (optional)
5. Configure HTTPS certificate

## 🐛 Troubleshooting

### Common Issues

#### Authentication Not Working
```javascript
// Check if main API is running
curl http://localhost:8000/health

// Verify JWT token in browser
console.log(localStorage.getItem('token'));

// Check API connectivity
fetch('/api/auth/validate-token')
  .then(r => r.json())
  .then(console.log);
```

#### Chat Messages Not Loading
```javascript
// Verify conversation context
const { messages } = useConversation();
console.log('Messages:', messages);

// Check API response
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test' })
});
```

#### TFL API Not Responding
```javascript
// Test TFL API directly
fetch('https://api.tfl.gov.uk/line/mode/tube/status')
  .then(r => r.json())
  .then(console.log);

// Check CORS and network
console.log('Network status:', navigator.onLine);
```

#### Speech Recognition Issues
```javascript
// Check browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
console.log('Speech recognition supported:', !!SpeechRecognition);

// Test microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => console.log('Microphone access granted'))
  .catch(console.error);
```

## 📈 Performance Optimization

### Code Splitting
- **React.lazy**: Lazy loading for non-critical components
- **Route-based splitting**: Separate bundles for different routes
- **Dynamic imports**: Load features on demand

### Caching Strategy
- **localStorage**: Conversation history persistence
- **Service Worker**: Offline functionality (future enhancement)
- **HTTP Caching**: Proper cache headers for static assets

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Asset Compression**: Optimized images and fonts
- **Code Minification**: Compressed JavaScript and CSS

## 🔄 Future Enhancements

### Planned Features
1. **Offline Support**: Service worker for offline functionality
2. **Push Notifications**: Real-time TFL alerts and updates
3. **User Preferences**: Customizable interface settings
4. **Advanced Analytics**: User interaction tracking
5. **Multi-language Support**: Internationalization capabilities

### Technical Improvements
1. **TypeScript Migration**: Enhanced type safety and developer experience
2. **Testing Suite**: Jest and React Testing Library implementation
3. **Performance Monitoring**: Web Vitals and error tracking
4. **SEO Optimization**: Meta tags and structured data
5. **Accessibility Enhancements**: WCAG 2.1 AA compliance

## 📚 Documentation

### Additional Resources
- **Migration Guide**: See `/tfl_migration.md` for complete implementation details
- **API Documentation**: Main backend API reference in `/api/docs/`
- **Component Docs**: Inline documentation in component files
- **Style Guide**: TFL design system documentation

### Related Projects
- **Main Website**: `/client/` - Equus main frontend
- **Backend API**: `/api/` - Authentication and data backend
- **AI Tutor**: `/ai-tutor/` - Similar AI application architecture

## 🤝 Contributing

### Development Guidelines
1. Follow React best practices and hooks patterns
2. Use Tailwind CSS for styling with TFL color system
3. Maintain mobile-first responsive design principles
4. Include proper error handling and loading states
5. Write clear, documented code with TypeScript typing (future)

### Code Standards
- **ESLint**: Follow established linting rules
- **Prettier**: Consistent code formatting
- **Naming**: Use descriptive, consistent naming conventions
- **Comments**: Document complex logic and business rules

## 📄 License

This project is part of the Equus Systems web application suite. All rights reserved.

---

**Version**: 2.0.0  
**Last Updated**: July 28, 2025  
**Status**: Production Ready ✅  
**Live URL**: https://ai-tfl.equussystems.co