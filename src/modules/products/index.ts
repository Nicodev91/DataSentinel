// Domain
export type { Product, ProductFilter, ProductRepository } from './domain/Product';

// Services
export { productService } from './services/ProductService';

// Infrastructure
export { productRepository, CATEGORIES, SORT_OPTIONS } from './infrastructure/ProductRepository';

// Hooks
export { useProductFilters } from './hooks/useProductFilters';

// Components
export { default as ProductCard } from './components/ProductCard';

// Pages
export { default as ProductDetail } from './pages/ProductDetail';