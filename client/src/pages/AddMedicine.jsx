// client/src/pages/AddMedicine.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import medicineService from '../services/medicineService';
import Navbar from '../components/Navbar.jsx';

const AddMedicine = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: '09:00', // Default time
    frequency: 'Daily',
    startDate: '',
    endDate: '', // ADDED END DATE
    photoURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API call to add medicine
      await medicineService.addMedicine(formData);
      
      alert(t('medicineAddedSuccess'));
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add medicine:', err.response?.data || err.message);
      setError(err.response?.data?.message || t('medicineAddedFail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center p-8 bg-gray-100 min-h-screen">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {t('addMedicine')}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('medicineName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('dosage')}</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('time')}</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('startDate')}</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* NEW FIELD: End Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('endDate')}</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">{t('frequency')}</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Daily">{t('daily')}</option>
              <option value="Weekly">{t('weekly')}</option>
              <option value="Custom">{t('custom')}</option>
            </select>
          </div>
          
          <button
            type="submit"
            className={`w-full text-white py-3 rounded-md font-semibold transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? t('adding') : t('add')}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMedicine;