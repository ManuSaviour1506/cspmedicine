// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './i18n/i18n'; // Import the i18n config

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);