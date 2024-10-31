import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika token tidak ada, arahkan pengguna ke halaman login
    return <Navigate to="/" replace />;
  }

  // Jika token ada, render children (halaman yang dilindungi)
  return children;
};

export default ProtectedRoute;
