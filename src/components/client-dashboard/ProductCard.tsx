import React from 'react';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, value: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 md:p-4 flex flex-col justify-between relative h-full">
      {product.isNew && (
        <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
      )}
      <img src={product.image} alt={product.name} className="w-full h-24 md:h-32 object-contain mb-2 md:mb-3" />
      <h3 className="font-semibold text-sm md:text-lg mb-1 text-gray-800 line-clamp-2">{product.name}</h3>
      <p className="text-green-700 font-bold text-lg md:text-xl mb-2">
        ${product.price.toFixed(0)} CLP
      </p>
      <div className="mt-auto space-y-2">
        <div className="flex items-center">
          <label htmlFor={`quantity-${product.id}`} className="mr-2 text-xs md:text-sm">Cantidad:</label>
          <select
            id={`quantity-${product.id}`}
            className="border rounded px-1 md:px-2 py-1 text-xs md:text-sm"
            value={quantity}
            onChange={e => onQuantityChange(product.id, Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <button
          className="w-full bg-green-600 text-white rounded px-2 md:px-4 py-2 hover:bg-green-700 transition font-semibold text-sm md:text-base"
          onClick={() => onAddToCart(product)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 