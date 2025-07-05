import React, { useState } from 'react';
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

  const filteredProducts = useProductFilters(category, sort, search);
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
        products={filteredProducts}
        quantities={quantities}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ClientDashboard; 