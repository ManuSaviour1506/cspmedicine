// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.jsx';
import { LogOut, LayoutDashboard, PlusCircle, UserCircle2 } from 'lucide-react'; // Added icons

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar-bg-gradient sticky top-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Logo with Gradient Text */}
        <Link to="/" className="text-3xl font-extrabold nav-text-gradient hover:opacity-80 transition-opacity flex items-center gap-2">
          <UserCircle2 size={28} className="nav-text-gradient" />
          MedEase
        </Link>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          {isAuthenticated ? (
            <>
              {/* Dashboard Link */}
              <Link 
                to="/dashboard" 
                className="text-gray-900 font-semibold text-lg hover:text-blue-700 transition-colors duration-300 flex items-center gap-1"
              >
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">{t('dashboard')}</span>
              </Link>
              
              {/* Add Medicine Link */}
              <Link 
                to="/add-medicine" 
                className="text-gray-900 font-semibold text-lg hover:text-blue-700 transition-colors duration-300 flex items-center gap-1"
              >
                <PlusCircle size={18} />
                <span className="hidden sm:inline">{t('addMedicine')}</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-red-700 font-semibold text-lg hover:text-red-900 transition-colors duration-300 flex items-center gap-1 p-2 rounded-lg bg-white/20 hover:bg-white/50"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">{t('logout')}</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-900 font-semibold text-lg hover:text-blue-700 transition-colors duration-300"
            >
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
