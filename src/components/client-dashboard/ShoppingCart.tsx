import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CartItem } from '../../data/products';

interface ShoppingCartProps {
  cart: CartItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart }) => {
  const { isClient } = useAuth();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal < 25000 ? 5000 : 0;
  
  // Aplicar descuento del 5% solo para clientes logueados
  const discount = isClient ? subtotal * 0.05 : 0;
  const totalAfterDiscount = subtotal - discount;
  const total = totalAfterDiscount + shippingCost;

  return (
    <div className="max-w-5xl mx-auto mt-8 mb-4 bg-white rounded shadow p-4 px-4 md:px-6">
      <h2 className="text-lg font-bold mb-2">Carrito de compras</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center text-sm md:text-base">
              <span className="flex-1 mr-2">{item.name} x{item.quantity}</span>
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
        <div className="font-bold text-lg md:text-xl">
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