import React from 'react';
import { Banner, Filters, Header, ProductGrid, ShoppingCart } from '../../products/components';
import { useProductFilters } from '../../products';
import { useShoppingCart } from '../../shopping-cart';

const ProductCatalog: React.FC = () => {
  const {
    products,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters
  } = useProductFilters();
  
  const {
    cart,
    quantities,
    handleQuantityChange,
    handleAddToCart,
    removeFromCart
  } = useShoppingCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando productos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error al cargar productos: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contenido principal */}
          <div className="flex-1">
            <Filters
              filters={filters}
              onFilterChange={updateFilter}
              onResetFilters={resetFilters}
            />
            
            <ProductGrid
              products={products}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          </div>
          
          {/* Carrito lateral */}
          <div className="lg:w-80">
            <ShoppingCart
              cart={cart.items || cart}
              onRemoveFromCart={removeFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;