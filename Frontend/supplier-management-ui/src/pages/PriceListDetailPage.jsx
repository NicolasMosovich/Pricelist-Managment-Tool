import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supplierService from '../services/supplier.service';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import './PriceListDetailPage.css';

/**
 * Price List Detail Page
 * Displays the latest price list for a specific supplier
 */
const PriceListDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [priceList, setPriceList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [showStatusActions, setShowStatusActions] = useState(false);

    useEffect(() => {
        fetchPriceList();
    }, [id]);

    const fetchPriceList = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await supplierService.getLatestPriceList(id);
            setPriceList(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch price list');
            console.error('Error fetching price list:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (statusCode, statusName) => {
        try {
            setUpdating(true);
            await supplierService.updatePriceListStatus(priceList.id, statusCode);
            // Refresh the price list data
            await fetchPriceList();
        } catch (err) {
            console.error('Error updating status:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleApprove = () => handleStatusUpdate(1, 'APPROVED');
    const handleReject = () => handleStatusUpdate(0, 'REJECTED');

    const handleBack = () => {
        navigate(`/suppliers/${id}`);
    };

    if (loading) return <Loading message="Loading price list..." />;

    if (error) {
        return (
            <div className="price-list-detail-page">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <div>
                        <h3>Error Loading Price List</h3>
                        <p>{error}</p>
                        <Button variant="primary" onClick={handleBack}>
                            Back to Supplier
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!priceList) return null;

    return (
        <div className="price-list-detail-page">
            <div className="page-header">
                <Button variant="outline" size="small" onClick={handleBack} className="back-button">
                    ← Back
                </Button>
            </div>

            <div className="detail-container">
                <div className="price-list-header">
                    <div className="header-content">
                        <h1 className="price-list-title">Latest Price List</h1>
                        <span className={`status-badge status-${priceList.status.toLowerCase()}`}>
                            {priceList.status}
                        </span>
                    </div>
                    {priceList.supplier && (
                        <p className="supplier-name">Supplier: {priceList.supplier.name}</p>
                    )}
                </div>

                <div className="status-update-section">
                    <Button
                        variant="outline"
                        size="small"
                        onClick={() => setShowStatusActions(!showStatusActions)}
                        className="toggle-status-btn"
                    >
                        {showStatusActions ? '▼ Hide Status Update' : '▶ Update Status'}
                    </Button>

                    {showStatusActions && (
                        <div className="status-actions">
                            <div className="action-buttons">
                                <Button
                                    variant="primary"
                                    onClick={handleApprove}
                                    disabled={updating}
                                    className="approve-btn"
                                    size="small"
                                >
                                    {updating ? 'Updating...' : '✓ Approve'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleReject}
                                    disabled={updating}
                                    className="reject-btn"
                                    size="small"
                                >
                                    {updating ? 'Updating...' : '✗ Reject'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="price-list-metadata">
                    <div className="metadata-grid">
                        <div className="metadata-item">
                            <label>Version</label>
                            <p>v{priceList.version}</p>
                        </div>
                        <div className="metadata-item">
                            <label>Submitted Date</label>
                            <p>{priceList.getFormattedSubmittedDate()}</p>
                        </div>
                        <div className="metadata-item">
                            <label>Effective Date</label>
                            <p>{priceList.getFormattedEffectiveDate()}</p>
                        </div>
                        <div className="metadata-item">
                            <label>Price List ID</label>
                            <p>#{priceList.id}</p>
                        </div>
                    </div>
                </div>

                {priceList.items && priceList.items.length > 0 ? (
                    <div className="price-list-items">
                        <h2>Price List Items</h2>
                        <div className="table-container">
                            <table className="items-table">
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceList.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td className="product-code">{item.product?.name || 'N/A'}</td>
                                            <td className="description">{item.product?.description || 'N/A'}</td>
                                            <td>{item.product?.category || 'N/A'}</td>
                                            <td className="price">${item.price?.toFixed(2) || '0.00'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="items-summary">
                            <span className="items-count">Total: {priceList.items.length} items</span>
                        </div>
                    </div>
                ) : (
                    <div className="no-items">
                        <p>No items found in this price list.</p>
                    </div>
                )}
                {priceList.originalFileUrl && (
                    <div className="file-info">
                        <label>Original File:</label>
                        <p className="file-url">{priceList.originalFileUrl}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceListDetailPage;
