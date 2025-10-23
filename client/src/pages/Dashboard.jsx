// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import medicineService from '../services/medicineService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector.jsx';

const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMedicines = async () => {
      try {
        const data = await medicineService.getMedicines();
        setMedicines(data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
        // If the request fails, assume token is invalid and log out
        logout();
      }
    };

    fetchMedicines();
  }, [isAuthenticated, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('dashboard')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            {t('logout')}
          </button>
        </div>
      </header>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/add-medicine')}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          {t('addMedicine')}
        </button>
      </div>

      {medicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((med) => (
            <div key={med._id} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{med.name}</h3>
              <p className="text-gray-600"><strong>{t('dosage')}:</strong> {med.dosage}</p>
              <p className="text-gray-600"><strong>{t('time')}:</strong> {med.time}</p>
              <p className="text-gray-600"><strong>{t('frequency')}:</strong> {med.frequency}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">{t('noMedicines')}</p>
      )}
    </div>
  );
};

export default Dashboard;