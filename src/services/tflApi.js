/**
 * TFL Agentic Flow API Service
 * Handles communication with tfl-agentic-flow-api backend
 * Separate from httpService.js which handles authentication
 */

const TFL_API_BASE = import.meta.env.VITE_TFL_API_URL || 'http://localhost:8000';

export const tflApi = {
  /**
   * Send chat message to TFL API
   */
  async chat(query, threadId = null, userContext = {}) {
    try {
      const response = await fetch(`${TFL_API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          threadId,
          userContext
        })
      });

      if (!response.ok) {
        throw new Error(`TFL API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[TFL API] Chat error:', error);
      throw error;
    }
  },

  /**
   * Send chat message with confirmation
   */
  async chatWithConfirmation(query, threadId, userContext, userConfirmation) {
    try {
      const response = await fetch(`${TFL_API_BASE}/api/chat/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          threadId,
          userContext,
          userConfirmation
        })
      });

      if (!response.ok) {
        throw new Error(`TFL API confirmation error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[TFL API] Chat confirmation error:', error);
      throw error;
    }
  },

  /**
   * Get conversation history
   */
  async getConversationHistory(threadId, limit = 50) {
    try {
      const response = await fetch(`${TFL_API_BASE}/api/conversations/${threadId}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`TFL API history error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[TFL API] Conversation history error:', error);
      throw error;
    }
  },

  /**
   * Health check for TFL API
   */
  async health() {
    try {
      const response = await fetch(`${TFL_API_BASE}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('[TFL API] Health check error:', error);
      return { healthy: false, error: error.message };
    }
  },

  /**
   * Get TFL lines information
   */
  async getLines() {
    try {
      const response = await fetch(`${TFL_API_BASE}/api/tfl/lines`);
      
      if (!response.ok) {
        throw new Error(`TFL API lines error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[TFL API] Lines error:', error);
      throw error;
    }
  }
};

export default tflApi;