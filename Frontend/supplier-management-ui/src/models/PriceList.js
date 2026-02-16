/**
 * PriceList Model
 * Represents a price list with its items and metadata
 */
export class PriceList {
    constructor(data = {}) {
        this.id = data.id || null;
        this.supplier = data.supplier || null;
        this.status = data.status || 'PENDING';
        this.effectiveDate = data.effectiveDate || null;
        this.submittedDate = data.submittedDate || null;
        this.version = data.version || 1;
        this.items = data.items || [];
        this.originalFileUrl = data.originalFileUrl || null;
    }

    /**
     * Convert to JSON for API requests
     */
    toJSON() {
        return {
            id: this.id,
            supplier: this.supplier,
            status: this.status,
            effectiveDate: this.effectiveDate,
            submittedDate: this.submittedDate,
            version: this.version,
            items: this.items,
            originalFileUrl: this.originalFileUrl,
        };
    }

    /**
     * Get formatted effective date
     */
    getFormattedEffectiveDate() {
        if (!this.effectiveDate) return 'N/A';
        return new Date(this.effectiveDate).toLocaleDateString();
    }

    /**
     * Get formatted submitted date
     */
    getFormattedSubmittedDate() {
        if (!this.submittedDate) return 'N/A';
        return new Date(this.submittedDate).toLocaleDateString();
    }

    /**
     * Get status badge color
     */
    getStatusColor() {
        const statusColors = {
            PENDING: 'warning',
            APPROVED: 'success',
            REJECTED: 'danger',
        };
        return statusColors[this.status] || 'default';
    }
}
