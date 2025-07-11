import React, { useState, useEffect } from 'react';
import { Banner, Filters, Header, ProductGrid, ShoppingCart } from '../../products/components';
import { useProductCatalog, useProductSearch, useProductsByCategory } from '../../products/hooks/useProductApi';
import { useShoppingCart } from '../../shopping-cart';
import type { ProductFilter } from '../../products/domain/Product';

const ProductCatalog: React.FC = () => {
  // Estado local para filtros
  const [filters, setFilters] = useState<ProductFilter>({
    category: '1',
    sortBy: 'name-asc',
    searchTerm: ''
  });

  // Hooks de API
  const { products: allProducts, loading: catalogLoading, error: catalogError } = useProductCatalog();
  const { products: searchResults, loading: searchLoading, searchProducts } = useProductSearch();
  const { products: categoryProducts, loading: categoryLoading, error: categoryError } = useProductsByCategory(filters.category || '1');

  // Estado para productos mostrados
  const [displayProducts, setDisplayProducts] = useState(allProducts);
  const [loading, setLoading] = useState(catalogLoading);
  const [error, setError] = useState<string | null>(catalogError);

  const {
    cart,
    quantities,
    handleQuantityChange,
    handleAddToCart,
    removeFromCart
  } = useShoppingCart();

  // Función para actualizar filtros
  const updateFilter = (key: keyof ProductFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setFilters({
      category: '1',
      sortBy: 'name-asc',
      searchTerm: ''
    });
  };

  // Efecto para manejar la lógica de filtros y búsqueda
  useEffect(() => {
    if (filters.searchTerm && filters.searchTerm.trim()) {
      // Si hay término de búsqueda, usar búsqueda
      searchProducts(filters.searchTerm);
      setDisplayProducts(searchResults);
      setLoading(searchLoading);
      setError(null);
    } else if (filters.category && filters.category !== '1') {
      // Si hay categoría seleccionada, usar productos por categoría
      setDisplayProducts(categoryProducts);
      setLoading(categoryLoading);
      setError(categoryError);
    } else {
      // Mostrar 1 los productos
      setDisplayProducts(allProducts);
      setLoading(catalogLoading);
      setError(catalogError);
    }
  }, [filters, allProducts, searchResults, categoryProducts, catalogLoading, searchLoading, categoryLoading, catalogError, categoryError, searchProducts]);

  // Aplicar ordenamiento local
  useEffect(() => {
    if (displayProducts.length > 0 && filters.sortBy) {
      const sortedProducts = [...displayProducts].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
      setDisplayProducts(sortedProducts);
    }
  }, [filters.sortBy]);

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
              products={displayProducts}
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