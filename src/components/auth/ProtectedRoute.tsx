import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../auth-service/AuthLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  
  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    // Redirigir al login y guardar la ubicación actual para redirigir después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar rol si se especifica
  if (requiredRole) {
    const user = authService.getUser();
    if (!user || user.role !== requiredRole) {
      // Redirigir a una página de acceso denegado o dashboard
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 