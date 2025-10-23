// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.jsx';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MedEase
        </Link>
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">
                {t('dashboard')}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-300"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">
              {t('login')}
            </Link>
          )}
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;