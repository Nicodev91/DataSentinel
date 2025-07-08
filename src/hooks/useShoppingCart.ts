import { useState } from 'react';
import type { Product, CartItem } from '../data/products';

export const useShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    // Opcional: resetear a 1 después de agregar
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const clearCart = () => {
    setCart([]);
    setQuantities({});
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return {
    cart,
    quantities,
    handleQuantityChange,
    handleAddToCart,
    clearCart,
    removeFromCart,
    updateCartItemQuantity
  };
};