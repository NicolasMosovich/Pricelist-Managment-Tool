/**
 * Supplier Model
 * Matches the backend Supplier entity
 */
export class Supplier {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.status = data.status || 'ACTIVE';
  }

  /**
   * Validates the supplier data
   * @returns {Object} - { isValid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.trim() === '') {
      errors.push('Name is required');
    }

    if (!this.email || this.email.trim() === '') {
      errors.push('Email is required');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Email format is invalid');
    }

    if (!this.phone || this.phone.trim() === '') {
      errors.push('Phone is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Email validation helper
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Returns a plain object representation
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      status: this.status,
    };
  }
}

/**
 * Supplier Status Enum
 */
export const SupplierStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export default Supplier;
