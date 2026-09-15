import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120309] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C9AB81]/30 border-t-[#C9AB81] rounded-full animate-spin mx-auto mb-4" />
          <p className="font-editorial text-xl tracking-widest text-[#C9AB81]">
            AUTHENTICATING STUDIO PORTAL...
          </p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
