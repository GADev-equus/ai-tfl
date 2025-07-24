/**
 * HTTP Service for AI Tutor Subdomain App
 * Configured to work with JWT cookie authentication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://equus-website-api.onrender.com';

class HttpService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get JWT token from localStorage (set by main site)
    const token = localStorage.getItem('auth_token');
    console.log('🔍 AI-TFL httpService - Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'NOT FOUND');
    
    const headers = { ...this.defaultHeaders, ...options.headers };
    
    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('🔑 AI-TFL httpService - Adding Authorization header');
    } else {
      console.log('❌ AI-TFL httpService - No token found, no Authorization header added');
    }
    
    const config = {
      method: 'GET',
      headers,
      credentials: 'include', // Still include for any other cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      console.error('HTTP Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

const httpService = new HttpService();
export default httpService;