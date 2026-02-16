import PropTypes from 'prop-types';
import Card from '../common/Card';
import Button from '../common/Button';
import './SupplierCard.css';

/**
 * Supplier Card Component
 * Displays individual supplier information
 */
const SupplierCard = ({ supplier, onView, onEdit, onDelete }) => {
  const statusClass = supplier.status === 'ACTIVE' ? 'status-active' : 'status-inactive';

  return (
    <Card className="supplier-card" hoverable>
      <div className="supplier-card-content">
        <div className="supplier-header">
          <h3 className="supplier-name">{supplier.name}</h3>
          <span className={`supplier-status ${statusClass}`}>
            {supplier.status}
          </span>
        </div>
        
        <div className="supplier-details">
          <div className="supplier-detail-item">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{supplier.email}</span>
          </div>
          <div className="supplier-detail-item">
            <span className="detail-icon">📱</span>
            <span className="detail-text">{supplier.phone}</span>
          </div>
        </div>

        <div className="supplier-actions">
          <Button 
            variant="primary" 
            size="small" 
            onClick={() => onView(supplier)}
            fullWidth
          >
            View price lists
          </Button>
        </div>
      </div>
    </Card>
  );
};

SupplierCard.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default SupplierCard;
