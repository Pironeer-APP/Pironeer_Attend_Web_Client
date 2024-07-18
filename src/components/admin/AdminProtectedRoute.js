import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAdminState } from '../../utils/authentication';

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminState(navigate);
  }, [navigate]);

  return children;
};

export default AdminProtectedRoute;
