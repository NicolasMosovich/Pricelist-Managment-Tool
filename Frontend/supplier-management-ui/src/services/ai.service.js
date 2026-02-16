import apiService from './api.service';
import { API_CONFIG } from '../config/api.config';

/**
 * AI Assistant Service
 * Handles communication with the AI assistant backend
 */
class AIService {
    /**
     * Ask a question to the AI assistant
     * @param {string} question - The question to ask
     * @returns {Promise<Object>} Response with answer and timestamp
     */
    async askQuestion(question) {
        try {
            const response = await apiService.post(API_CONFIG.ENDPOINTS.AI_ASSISTANT.ASK, {
                question
            });
            return response;
        } catch (error) {
            console.error('Error asking AI assistant:', error);
            throw error;
        }
    }
}

export default new AIService();
