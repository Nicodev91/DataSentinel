import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../data/products';

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
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 md:p-4 flex flex-col justify-between relative h-full">
      {product.isNew && (
        <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
      )}
      
      {/* Imagen clickeable */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer"
      >
        <img src={product.image} alt={product.name} className="w-full h-24 md:h-32 object-contain mb-2 md:mb-3" />
      </div>
      
      {/* Nombre clickeable */}
      <h3 
        onClick={() => navigate(`/product/${product.id}`)}
        className="font-semibold text-sm md:text-lg mb-1 text-gray-800 line-clamp-2 cursor-pointer hover:text-green-600 transition"
      >
        {product.name}
      </h3>
      
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
        
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-green-600 text-white rounded px-2 md:px-4 py-2 hover:bg-green-700 transition font-semibold text-xs md:text-sm"
            onClick={() => onAddToCart(product)}
          >
            Agregar
          </button>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-gray-200 text-gray-700 rounded px-2 md:px-3 py-2 hover:bg-gray-300 transition text-xs md:text-sm"
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;