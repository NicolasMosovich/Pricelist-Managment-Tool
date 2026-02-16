import API_CONFIG from '../config/api.config';

/**
 * Base API Service
 * Handles all HTTP requests with error handling
 */
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  /**
   * Generic request handler
   * @param {string} endpoint 
   * @param {Object} options - fetch options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint 
   * @returns {Promise<any>}
   */
  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  /**
   * POST request
   * @param {string} endpoint 
   * @param {Object} data 
   * @returns {Promise<any>}
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint 
   * @param {Object} data 
   * @returns {Promise<any>}
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint 
   * @returns {Promise<any>}
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
