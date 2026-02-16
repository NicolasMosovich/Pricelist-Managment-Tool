import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supplierService from '../services/supplier.service';
import Button from '../components/common/Button';
import './PriceListHistoryPage.css';

const PriceListHistoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [priceListHistory, setPriceListHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        fetchPriceListHistory();
    }, [id]);

    const fetchPriceListHistory = async () => {
        try {
            setLoading(true);
            const history = await supplierService.getPriceListHistory(id);
            setPriceListHistory(history);
        } catch (err) {
            setError(err.message || 'Failed to load price list history');
        } finally {
            setLoading(false);
        }
    };

    const toggleItems = (priceListId) => {
        setExpandedItems(prev => ({
            ...prev,
            [priceListId]: !prev[priceListId]
        }));
    };

    if (loading) {
        return (
            <div className="price-list-history-page">
                <div className="loading">Loading price list history...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="price-list-history-page">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <div>
                        <h3>Error Loading History</h3>
                        <p>{error}</p>
                        <Button variant="primary" onClick={() => navigate(`/suppliers/${id}`)}>
                            Back to Supplier
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="price-list-history-page">
            <div className="page-header">
                <Button
                    variant="outline"
                    onClick={() => navigate(`/suppliers/${id}`)}
                    className="back-button"
                >
                    ← Back
                </Button>
            </div>

            <div className="history-container">
                <div className="history-header">
                    <h1 className="history-title">Price List History</h1>
                    {priceListHistory.length > 0 && priceListHistory[0].supplier && (
                        <p className="supplier-name">Supplier: {priceListHistory[0].supplier.name}</p>
                    )}
                </div>

                {priceListHistory.length > 0 ? (
                    <div className="history-list">
                        {priceListHistory.map((priceList) => (
                            <div key={priceList.id} className="price-list-card">
                                <div className="card-header">
                                    <div className="header-info">
                                        <div className="version-info">
                                            <h3>Version {priceList.version}</h3>
                                            <span className={`status-badge status-${priceList.status.toLowerCase()}`}>
                                                {priceList.status}
                                            </span>
                                        </div>
                                        <div className="date-info">
                                            <div className="date-item">
                                                <label>Submitted:</label>
                                                <span>{priceList.getFormattedSubmittedDate()}</span>
                                            </div>
                                            <div className="date-item">
                                                <label>Effective:</label>
                                                <span>{priceList.getFormattedEffectiveDate()}</span>
                                            </div>
                                            <div className="date-item">
                                                <label>Items:</label>
                                                <span>{priceList.items?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="small"
                                        onClick={() => toggleItems(priceList.id)}
                                        className="toggle-btn"
                                    >
                                        {expandedItems[priceList.id] ? '▼ Hide Items' : '▶ Show Items'}
                                    </Button>
                                </div>

                                {expandedItems[priceList.id] && priceList.items && priceList.items.length > 0 && (
                                    <div className="items-section">
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-history">
                        <p>No price list history found for this supplier.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceListHistoryPage;
