import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth';

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
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-500"
                >
                  🚪 Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500"
                >
                  📝 Registrarse
                </Link>
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-emerald-500"
                >
                  🔑 Login
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-green-700">Supermercado San Nicolás</div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-red-500"
                >
                  🚪 Salir
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-blue-500"
                  >
                    📝 Registro
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-emerald-500"
                  >
                    🔑 Login
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