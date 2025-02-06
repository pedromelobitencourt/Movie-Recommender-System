import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../../Hooks/UseAuth';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
