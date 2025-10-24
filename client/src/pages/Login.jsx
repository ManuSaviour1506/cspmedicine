// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import CustomModal from '../components/CustomModal.jsx'; // New dependency
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate('/dashboard'); // Redirect on successful login
    } catch (err) {
      console.error('Login failed:', err);
      setError(t('invalidCredentials'));
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Apply main gradient background */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-8 app-bg-gradient">
        {/* Apply glass card style */}
        <form 
          onSubmit={handleSubmit} 
          className="p-8 bg-white/90 rounded-2xl shadow-xl w-full max-w-sm border border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-[#4286f4] flex items-center justify-center gap-2">
            <LogIn size={24} /> {t('login')}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4286f4] transition duration-200 bg-white/70"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4286f4] transition duration-200 bg-white/70"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#4286f4] to-[#373B44] hover:from-[#373B44] hover:to-[#4286f4] shadow-lg hover:shadow-xl'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : t('login')}
          </button>
          <p className="mt-6 text-center text-gray-200 text-sm">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-[#a8ff78] font-semibold hover:text-[#78ffd6] hover:underline transition-colors">
              {t('registerNow')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
