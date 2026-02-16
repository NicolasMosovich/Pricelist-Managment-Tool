// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    SUPPLIERS: {
      GET_ALL: '/suppliers',
      GET_BY_ID: (id) => `/suppliers/${id}`,
      GET_LATEST_LIST: (id) => `/suppliers/${id}/latest-list`,
      UPDATE_PRICE_LIST_STATUS: (priceListId) => `/suppliers/price-lists/${priceListId}/status`,
      GET_PRICE_LIST_HISTORY: (id) => `/suppliers/${id}/price-lists`,
      CREATE: '/suppliers',
      UPDATE: (id) => `/suppliers/${id}`,
      DELETE: (id) => `/suppliers/${id}`,
    },
    AI_ASSISTANT: {
      ASK: '/ai-assistant/ask'
    }
  },
};

export default API_CONFIG;
