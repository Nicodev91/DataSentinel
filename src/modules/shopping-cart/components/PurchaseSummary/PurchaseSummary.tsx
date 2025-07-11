import React, { useState } from 'react';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import { useAuth } from '../../../auth';
import type { CartItem } from '../../domain/Cart';

interface PurchaseSummaryProps {
  onProceedToPayment?: () => void;
  showPaymentButton?: boolean;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ 
  onProceedToPayment, 
  showPaymentButton = true 
}) => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useShoppingCart();
  const { isClient } = useAuth();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    whatsapp: ''
  });

  // Cálculos del resumen
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isClient ? subtotal * 0.05 : 0;
  const shippingCost = subtotal >= 25000 ? 0 : 3000;
  const total = subtotal - discount + shippingCost;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToPayment = () => {
    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.rut || !formData.direccion || !formData.whatsapp) {
      alert('Por favor completa todos los campos del formulario');
      return;
    }

    if (onProceedToPayment) {
      onProceedToPayment();
    } else {
      // Funcionalidad por defecto - mostrar alerta con datos
      alert(`Solicitud enviada para:\nNombre: ${formData.nombre}\nRUT: ${formData.rut}\nDirección: ${formData.direccion}\nWhatsApp: ${formData.whatsapp}`);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600">Agrega algunos productos para ver tu resumen de compra</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resumen de Compra</h2>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item: CartItem) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            {/* Imagen del producto */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-2xl">📦</span>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">${item.price.toLocaleString('es-CL')} CLP</p>
            </div>

            {/* Controles de cantidad */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            {/* Precio total del item */}
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de costos */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cart.totalItems} productos)</span>
          <span>${subtotal.toLocaleString('es-CL')} CLP</span>
        </div>
        
        {isClient && (
          <div className="flex justify-between text-green-600">
            <span>Descuento cliente (5%)</span>
            <span>-${discount.toLocaleString('es-CL')} CLP</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              `$${shippingCost.toLocaleString('es-CL')} CLP`
            )}
          </span>
        </div>
        
        {subtotal < 25000 && (
          <p className="text-sm text-gray-500">
            Agrega ${(25000 - subtotal).toLocaleString('es-CL')} CLP más para envío gratis
          </p>
        )}
        
        <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${total.toLocaleString('es-CL')} CLP</span>
        </div>
      </div>

      {/* Formulario de datos del cliente */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos de entrega</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-1">
              RUT *
            </label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="12.345.678-9"
            />
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de entrega *
            </label>
            <textarea
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
              placeholder="Calle, número, comuna, ciudad"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp *
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+56 9 1234 5678"
            />
          </div>
        </div>
      </div>

      {/* Botón de proceder al pago */}
      {showPaymentButton && (
        <div className="mt-6">
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Enviar solicitud
          </button>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {isClient ? (
            "✅ Descuento de cliente aplicado"
          ) : (
            "💡 Regístrate para obtener 5% de descuento"
          )}
        </p>
      </div>
    </div>
  );
};

export default PurchaseSummary;