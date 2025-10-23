// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use authService.register to create the user
      await authService.register(formData);
      
      // Directly log the user in and redirect to dashboard
      // The authService.register function already handles setting the token in local storage,
      // so the context will automatically pick it up.
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Registration failed', error);
      alert(t('registrationFailed'));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('register')}</h2>
          <div className="mb-4">
            <label className="block text-gray-700">{t('name')}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('email')}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('phone')}</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">{t('password')}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            {t('register')}
          </button>
          <p className="mt-4 text-center text-gray-600">
            {t('haveAccount')}{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t('loginNow')}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;