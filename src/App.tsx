import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/jobs" replace /> : <LoginPage />}
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
