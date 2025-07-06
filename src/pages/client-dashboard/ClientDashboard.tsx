import React, { useState, useMemo } from 'react';
import {
  Header,
  Banner,
  Filters,
  ShoppingCart,
  ProductGrid
} from '../../components/client-dashboard';
import { useProductFilters, useShoppingCart } from '../../hooks';

const ClientDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>('Todos');
  const [sort, setSort] = useState<string>('default');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const PRODUCTS_PER_PAGE = 12;
  
  const filteredProducts = useProductFilters(category, sort, search);
  
  // Calcular productos paginados
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);
  
  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  
  // Resetear página cuando cambien los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, search]);
  
  const {
    cart,
    quantities,
    handleQuantityChange,
    handleAddToCart
  } = useShoppingCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner />
      
      <Filters
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />

      <ShoppingCart cart={cart} />

      <ProductGrid
        products={paginatedProducts}
        quantities={quantities}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
      />
      
      {/* Componente de Paginación */}
      {totalPages > 1 && (
        <div className="max-w-5xl mx-auto mt-8 mb-10 px-4">
          <div className="flex justify-center items-center space-x-2">
            {/* Botón Anterior */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Anterior
            </button>
            
            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            
            {/* Botón Siguiente */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Siguiente
            </button>
          </div>
          
          {/* Información de paginación */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Mostrando {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1} - {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} productos
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;