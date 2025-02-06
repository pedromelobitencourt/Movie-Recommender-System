import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth';

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redireciona para /catalog se estiver autenticado
  return isAuthenticated ? <Navigate to="/catalog" /> : <Outlet />;
};

export default PublicRoute;
