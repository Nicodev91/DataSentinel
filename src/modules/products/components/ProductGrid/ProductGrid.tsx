import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../domain/Product';

interface ProductGridProps {
  products: Product[];
  quantities: { [id: number]: number };
  onQuantityChange: (productId: number, value: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  quantities,
  onQuantityChange,
  onAddToCart
}) => {
  console.log(products)
  return (
    <div className="max-w-5xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-4 md:px-2 pb-10">
      {products.map(product => (
        <ProductCard
          key={product.productId || product.id}
        product={product}
        quantity={quantities[product.productId || product.id || 0] || 1}
          onQuantityChange={onQuantityChange}
          onAddToCart={onAddToCart}
        />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-10">No se encontraron productos.</div>
      )}
    </div>
  );
};

export default ProductGrid;