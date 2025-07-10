// Domain
export type { Cart, CartItem, CartService, CartRepository } from './domain/Cart';

// Services
export { cartService } from './services/CartService';

// Infrastructure
export { cartRepository } from './infrastructure/CartRepository';

// Hooks
export { useShoppingCart } from './hooks/useShoppingCart';