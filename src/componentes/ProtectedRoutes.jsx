import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  console.log("Token encontrado:", token);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
