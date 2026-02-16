import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supplierService from '../services/supplier.service';
import SupplierList from '../components/supplier/SupplierList';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import './SuppliersPage.css';

/**
 * Suppliers Page
 * Main page displaying all suppliers
 */
const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/suppliers/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch suppliers');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSupplier = (supplier) => {
    // Navigate to supplier detail page (to be implemented)
    navigate(`/suppliers/${supplier.id}`);
  };

  const handleEditSupplier = (supplier) => {
    // Navigate to edit page (to be implemented)
    navigate(`/suppliers/${supplier.id}/edit`);
  };

  const handleDeleteSupplier = async (supplier) => {
    if (window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      try {
        await supplierService.deleteSupplier(supplier.id);
        // Refresh the list after deletion
        fetchSuppliers();
      } catch (err) {
        alert(`Failed to delete supplier: ${err.message}`);
      }
    }
  };

  const handleCreateSupplier = () => {
    // Navigate to create page (to be implemented)
    navigate('/suppliers/new');
  };

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <div className="header-container">
          <div className="header-content-wrapper">
            <div className="header-text">
              <h1 className="page-title">Supplier's price list management</h1>
              <p className="page-subtitle">View and manage your supplier price lists</p>
            </div>
            <div className="header-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="search-container-wrapper">
        <form onSubmit={handleSearch} className="search-container">
          <div className="search-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="page-content">
        {loading && <Loading message="Loading suppliers..." />}
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <div>
              <h3>Error Loading Suppliers</h3>
              <p>{error}</p>
              <Button variant="primary" onClick={fetchSuppliers}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <SupplierList
            suppliers={suppliers}
            onView={handleViewSupplier}
            onEdit={handleEditSupplier}
            onDelete={handleDeleteSupplier}
          />
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;
