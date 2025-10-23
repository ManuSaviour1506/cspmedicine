// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard'); // Redirect on successful login
    } catch (error) {
      console.error('Login failed:', error);
      alert(t('invalidCredentials'));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>
          <div className="mb-4">
            <label className="block text-gray-700">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {t('login')}
          </button>
          <p className="mt-4 text-center text-gray-600">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              {t('registerNow')}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;