// client/src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import AddMedicine from '../pages/AddMedicine.jsx'; // Import the new page
import Register from '../pages/Register.jsx'; // Import the Register page

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; 
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-medicine" // New route for adding medicine
          element={
            <PrivateRoute>
              <AddMedicine />
            </PrivateRoute>
          }
        />
        {/* You can add routes for editing and deleting medicines here as well */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;