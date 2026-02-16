import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuppliersPage from './pages/SuppliersPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SupplierDetailPage from './pages/SupplierDetailPage';
import PriceListDetailPage from './pages/PriceListDetailPage';
import PriceListHistoryPage from './pages/PriceListHistoryPage';
import ThemeToggle from './components/common/ThemeToggle';
import ChatWidget from './components/chat/ChatWidget';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply dark mode class to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<Navigate to="/suppliers" replace />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/suppliers/search/:query" element={<SearchResultsPage />} />
          <Route path="/suppliers/:id/latest-list" element={<PriceListDetailPage />} />
          <Route path="/suppliers/:id/price-lists" element={<PriceListHistoryPage />} />
          <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
          {/* Future routes for supplier detail, edit, and create pages */}
          {/* <Route path="/suppliers/:id/edit" element={<SupplierEditPage />} /> */}
          {/* <Route path="/suppliers/new" element={<SupplierCreatePage />} /> */}
        </Routes>
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
