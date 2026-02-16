import PropTypes from 'prop-types';
import SupplierCard from './SupplierCard';
import './SupplierList.css';

/**
 * Supplier List Component
 * Displays a grid of supplier cards
 */
const SupplierList = ({ suppliers, onView, onEdit, onDelete }) => {
  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No Suppliers Found</h3>
        <p>There are no suppliers to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="supplier-list">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

SupplierList.propTypes = {
  suppliers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default SupplierList;
