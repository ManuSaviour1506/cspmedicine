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
    endDate: '',
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

    // Validate dates if provided
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        setError(t('endDateError') || 'End date cannot be before start date');
        setLoading(false);
        return;
      }
    }

    try {
      // API call to add medicine
      await medicineService.addMedicine(formData);
      
      alert(t('medicineAddedSuccess') || 'Medicine added successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add medicine:', err.response?.data || err.message);
      setError(err.response?.data?.message || t('medicineAddedFail') || 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {t('addMedicine') || 'Add Medicine'}
            </h2>
            <p className="text-gray-600 mt-2">{t('addMedicineDesc') || 'Fill in the details below to add a new medicine reminder'}</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="block sm:inline">{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('medicineName') || 'Medicine Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('medicineNamePlaceholder') || 'e.g., Aspirin, Vitamin D'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('dosage') || 'Dosage'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder={t('dosagePlaceholder') || 'e.g., 500mg, 2 tablets'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('time') || 'Time'} <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('startDate') || 'Start Date'} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('endDate') || 'End Date'} <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('frequency') || 'Frequency'} <span className="text-red-500">*</span>
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="Daily">{t('daily') || 'Daily'}</option>
                <option value="Weekly">{t('weekly') || 'Weekly'}</option>
                <option value="Monthly">{t('monthly') || 'Monthly'}</option>
                <option value="Custom">{t('custom') || 'Custom'}</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('photoURL') || 'Photo URL'} <span className="text-gray-500 text-sm font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder={t('photoURLPlaceholder') || 'https://example.com/medicine-photo.jpg'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {formData.photoURL && (
                <div className="mt-3">
                  <img 
                    src={formData.photoURL} 
                    alt="Medicine preview" 
                    className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
            >
              {t('cancel') || 'Cancel'}
            </button>
            <button
              type="submit"
              className={`flex-1 text-white py-3 rounded-lg font-semibold transition duration-300 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('adding') || 'Adding...'}
                </span>
              ) : (
                t('add') || 'Add Medicine'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMedicine;