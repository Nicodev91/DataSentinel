import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, isClient, user, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center">
          <div className="text-xl font-bold text-green-700">Supermercado San Nicolás</div>
          <div className="text-sm text-gray-600 font-bold">Registrate y obtén un 5% de descuento en todas tus compras!</div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-gray-600">
                  Bienvenido, {user?.name}
                  {isClient && <span className="ml-2 text-green-600 font-medium">(Cliente - 5% descuento)</span>}
                </div>
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Registrarse
                </Link>
                <Link 
                  to="/login" 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-bold text-green-700">Supermercado San Nicolás</div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Salir
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Registrarse
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <div className="text-xs text-gray-600 mb-2">
              Bienvenido, {user?.name}
              {isClient && <span className="ml-1 text-green-600 font-medium">(5% descuento)</span>}
            </div>
          )}
          <div className="text-xs text-gray-600 text-center">
            ¡Registrate y obtén un 5% de descuento!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 