/**
 * Sophisticated TFL Agentic Flow API Service
 * Copied from tfl-agentic-flow-client for full feature compatibility
 * Handles communication with tfl-agentic-flow-api backend multi-agent system
 */

// API configuration
const API_BASE_URL = import.meta.env.VITE_TFL_API_URL || 'http://localhost:8000';

// Create fetch wrapper with timeout and error handling
const apiRequest = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      throw new Error(errorData?.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to TFL service. Please check your connection.');
    }
    
    throw error;
  }
};

// API service functions
export const tflApi = {
  // Health check
  async health() {
    try {
      console.log('Making GET request to /api/health');
      return await apiRequest('/api/health');
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Application info
  async getAppInfo() {
    try {
      console.log('Making GET request to /api/info');
      return await apiRequest('/api/info');
    } catch (error) {
      console.error('Failed to get app info:', error);
      throw error;
    }
  },

  // Send chat message (maps to the sophisticated backend)
  async chat(query, threadId = null, userContext = {}) {
    try {
      console.log(`Making POST request to /api/chat`);
      return await apiRequest('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          query, // Backend expects 'query' not 'message'
          threadId,
          userContext,
        }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },

  // Send chat message with confirmation (human-in-the-loop)
  async chatWithConfirmation(query, threadId, userConfirmation, userContext = {}) {
    try {
      console.log(`Making POST request to /api/chat/confirm`);
      return await apiRequest('/api/chat/confirm', {
        method: 'POST',
        body: JSON.stringify({
          query,
          threadId,
          userConfirmation,
          userContext,
        }),
      });
    } catch (error) {
      console.error('Failed to send message with confirmation:', error);
      throw error;
    }
  },

  // Stream chat messages (Server-Sent Events for workflow progress)
  async streamMessage(query, threadId = null, userContext = {}) {
    try {
      const params = new URLSearchParams({
        query,
        userContext: JSON.stringify(userContext)
      });
      
      const url = `/api/chat/stream/${threadId || 'new'}?${params}`;
      console.log(`Creating EventSource for ${url}`);
      return new EventSource(`${API_BASE_URL}${url}`);
    } catch (error) {
      console.error('Failed to create stream connection:', error);
      throw error;
    }
  },

  // Get conversation history
  async getConversationHistory(threadId, limit = 50) {
    try {
      console.log(`Making GET request to /api/conversations/${threadId}`);
      return await apiRequest(`/api/conversations/${threadId}?limit=${limit}`);
    } catch (error) {
      console.error('Failed to get conversation:', error);
      throw error;
    }
  },

  // TFL-specific endpoints (future expansion)
  tfl: {
    async getLineStatus(line) {
      try {
        return await apiRequest(`/api/tfl/status/${line}`);
      } catch (error) {
        console.error(`Failed to get ${line} line status:`, error);
        throw error;
      }
    },

    async getDisruptions(line) {
      try {
        return await apiRequest(`/api/tfl/disruptions/${line}`);
      } catch (error) {
        console.error(`Failed to get ${line} line disruptions:`, error);
        throw error;
      }
    },

    async getStations(line) {
      try {
        return await apiRequest(`/api/tfl/stations/${line}`);
      } catch (error) {
        console.error(`Failed to get ${line} line stations:`, error);
        throw error;
      }
    },

    async planJourney(from, to, options = {}) {
      try {
        return await apiRequest('/api/tfl/journey', {
          method: 'POST',
          body: JSON.stringify({
            from,
            to,
            ...options,
          }),
        });
      } catch (error) {
        console.error('Failed to plan journey:', error);
        throw error;
      }
    },
  },
};

export default tflApi;