import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supplierService from '../services/supplier.service';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './SupplierDetailPage.css';

/**
 * Supplier Details Page
 * Displays detailed information about a specific supplier
 * and provides options to manage price lists
 */
const SupplierDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSupplierDetails();
  }, [id]);

  const fetchSupplierDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getSupplierById(id);
      setSupplier(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch supplier details');
      console.error('Error fetching supplier details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePriceList = () => {
    // Navigate to latest price list page
    navigate(`/suppliers/${id}/latest-list`);
  };

  const handleListHistory = () => {
    // Navigate to price list history
    navigate(`/suppliers/${id}/price-lists`);
  };

  const handleBack = () => {
    navigate('/suppliers');
  };

  if (loading) return <Loading message="Loading supplier details..." />;

  if (error) {
    return (
      <div className="supplier-detail-page">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <div>
            <h3>Error Loading Supplier</h3>
            <p>{error}</p>
            <Button variant="primary" onClick={handleBack}>
              Back to List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) return null;

  return (
    <div className="supplier-detail-page">
      <div className="page-header">
        <Button variant="outline" size="small" onClick={handleBack} className="back-button">
          ← Back
        </Button>
      </div>

      <div className="detail-container">
        <div className="supplier-header-section">
          <h1 className="supplier-name-large">{supplier.name}</h1>
          <span className={`status-badge status-${supplier.status.toLowerCase()}`}>
            {supplier.status}
          </span>
        </div>

        <div className="supplier-info-grid">
          <div className="info-group">
            <label>Email</label>
            <p>{supplier.email}</p>
          </div>
          <div className="info-group">
            <label>Phone</label>
            <p>{supplier.phone}</p>
          </div>
          <div className="info-group">
            <label>Supplier ID</label>
            <p>#{supplier.id}</p>
          </div>
        </div>

        <div className="action-buttons-container">
          <Button
            variant="primary"
            size="large"
            onClick={handleUpdatePriceList}
            className="action-btn"
          >
            Updated price list
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={handleListHistory}
            className="action-btn"
          >
            List history
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailPage;
