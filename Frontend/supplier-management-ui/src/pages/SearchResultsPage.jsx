import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supplierService from '../services/supplier.service';
import SupplierList from '../components/supplier/SupplierList';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import './SearchResultsPage.css';

/**
 * Search Results Page
 * Displays suppliers matching the search query
 */
const SearchResultsPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.searchSuppliers(query);
      setSuppliers(data);
    } catch (err) {
      setError(err.message || 'Failed to search suppliers');
      console.error('Error searching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/suppliers');
  };

  const handleViewSupplier = (supplier) => {
    navigate(`/suppliers/${supplier.id}`);
  };

  return (
    <div className="search-results-page">
      <div className="page-header">
        <Button variant="outline" size="small" onClick={handleBack} className="back-button">
          ← Back to List
        </Button>
      </div>

      <div className="results-container">
        <div className="results-header">
          <h2>
            {loading ? 'Searching...' : (
              suppliers.length > 0 
                ? `${suppliers.length} Result${suppliers.length !== 1 ? 's' : ''} found for query "${query}"`
                : `No results found for query "${query}"`
            )}
          </h2>
        </div>

        {loading && <Loading message="Finding suppliers..." />}
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <SupplierList
            suppliers={suppliers}
            onView={handleViewSupplier}
            emptyMessage={`No suppliers matching "${query}" were found.`}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
