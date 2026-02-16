import apiService from './api.service';
import API_CONFIG from '../config/api.config';
import { Supplier } from '../models/Supplier';
import { PriceList } from '../models/PriceList';

/**
 * Supplier Service
 * Handles all supplier-related API calls
 */
class SupplierService {
  /**
   * Get all suppliers
   * @returns {Promise<Supplier[]>}
   */
  async getAllSuppliers() {
    try {
      const data = await apiService.get(API_CONFIG.ENDPOINTS.SUPPLIERS.GET_ALL);
      return data.map((supplier) => new Supplier(supplier));
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw error;
    }
  }

  /**
   * Get supplier by ID
   * @param {number} id 
   * @returns {Promise<Supplier>}
   */
  async getSupplierById(id) {
    try {
      const data = await apiService.get(API_CONFIG.ENDPOINTS.SUPPLIERS.GET_BY_ID(id));
      return new Supplier(data);
    } catch (error) {
      console.error(`Error fetching supplier ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search suppliers by query
   * @param {string} query 
   * @returns {Promise<Supplier[]>}
   */
  async searchSuppliers(query) {
    try {
      const data = await apiService.get(`/suppliers/search/${query}`);
      return data.map((supplier) => new Supplier(supplier));
    } catch (error) {
      console.error(`Error searching suppliers with query ${query}:`, error);
      throw error;
    }
  }

  /**
   * Create a new supplier
   * @param {Supplier} supplier 
   * @returns {Promise<Supplier>}
   */
  async createSupplier(supplier) {
    try {
      const data = await apiService.post(
        API_CONFIG.ENDPOINTS.SUPPLIERS.CREATE,
        supplier.toJSON()
      );
      return new Supplier(data);
    } catch (error) {
      console.error('Error creating supplier:', error);
      throw error;
    }
  }

  /**
   * Update an existing supplier
   * @param {number} id 
   * @param {Supplier} supplier 
   * @returns {Promise<Supplier>}
   */
  async updateSupplier(id, supplier) {
    try {
      const data = await apiService.put(
        API_CONFIG.ENDPOINTS.SUPPLIERS.UPDATE(id),
        supplier.toJSON()
      );
      return new Supplier(data);
    } catch (error) {
      console.error(`Error updating supplier ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get latest price list for a supplier
   * @param {number} id 
   * @returns {Promise<PriceList>}
   */
  async getLatestPriceList(id) {
    try {
      const data = await apiService.get(API_CONFIG.ENDPOINTS.SUPPLIERS.GET_LATEST_LIST(id));
      return new PriceList(data);
    } catch (error) {
      console.error(`Error fetching latest price list for supplier ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update price list status
   * @param {number} priceListId 
   * @param {number} statusCode - 1 for APPROVED, 0 for REJECTED
   * @returns {Promise<PriceList>}
   */
  async updatePriceListStatus(priceListId, statusCode) {
    try {
      const data = await apiService.put(
        `${API_CONFIG.ENDPOINTS.SUPPLIERS.UPDATE_PRICE_LIST_STATUS(priceListId)}?statusCode=${statusCode}`
      );
      return new PriceList(data);
    } catch (error) {
      console.error(`Error updating price list status ${priceListId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a supplier
   * @param {number} id 
   * @returns {Promise<void>}
   */
  async deleteSupplier(id) {
    try {
      await apiService.delete(API_CONFIG.ENDPOINTS.SUPPLIERS.DELETE(id));
    } catch (error) {
      console.error(`Error deleting supplier ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get price list history for a supplier
   * @param {number} id 
   * @returns {Promise<PriceList[]>}
   */
  async getPriceListHistory(id) {
    try {
      const data = await apiService.get(API_CONFIG.ENDPOINTS.SUPPLIERS.GET_PRICE_LIST_HISTORY(id));
      return data.map(item => new PriceList(item));
    } catch (error) {
      console.error(`Error fetching price list history for supplier ${id}:`, error);
      throw error;
    }
  }
}

export default new SupplierService();
