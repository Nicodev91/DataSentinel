import React from 'react';
import { useAuth } from '../../modules/auth';
import type { CartItem } from '../../modules/shopping-cart';

interface ShoppingCartProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart, onRemoveFromCart }) => {
  const { isClient } = useAuth();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isClient ? subtotal * 0.05 : 0;
  const shippingCost = subtotal >= 25000 ? 0 : 3000;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border sticky top-4">
      <h3 className="text-lg font-bold mb-4 text-center">Carrito de Compras</h3>
      
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-sm md:text-base">Tu carrito está vacío</p>
      ) : (
        <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center text-sm md:text-base">
              <div className="flex-1 mr-2">
                <div>{item.name} x{item.quantity}</div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-500 text-xs hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
              <span className="font-medium">${(item.price * item.quantity).toLocaleString()} CLP</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-4 space-y-1 text-right">
        <div className="text-gray-600 text-sm md:text-base">
          Subtotal: ${subtotal.toLocaleString()} CLP
        </div>
        {discount > 0 && (
          <div className="text-green-600 font-medium text-sm md:text-base">
            Descuento cliente (5%): -${discount.toLocaleString()} CLP
          </div>
        )}
        {shippingCost > 0 && (
          <div className="text-orange-600 font-medium text-sm md:text-base">
            Envío: ${shippingCost.toLocaleString()} CLP
          </div>
        )}
        {shippingCost === 0 && subtotal > 0 && (
          <div className="text-green-600 font-medium text-sm md:text-base">
            ¡Envío gratis!
          </div>
        )}
        <div className="text-lg font-bold border-t pt-2">
          Total: ${total.toLocaleString()} CLP
        </div>
      </div>
      
      {cart.length > 0 && (
        <div className="w-full flex justify-center md:justify-end mt-4"> 
          <a
            href={`https://wa.me/56948853814?text=${encodeURIComponent(
              `Hola, quiero comprar:\n` +
              cart.map(item => `- ${item.name} x${item.quantity} (${(item.price * item.quantity).toLocaleString()} CLP)`).join('\n') +
              `\nSubtotal: ${subtotal.toLocaleString()} CLP` +
              (discount > 0 ? `\nDescuento cliente (5%): -${discount.toLocaleString()} CLP` : '') +
              (shippingCost > 0 ? `\nEnvío: ${shippingCost.toLocaleString()} CLP` : '\n¡Envío gratis!') +
              `\nTotal: ${total.toLocaleString()} CLP`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded transition w-full md:w-auto text-center"
          >
            Comprar
          </a>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;