// Domain
export type { Product, ProductFilter, ProductRepository } from './domain/Product';

// Exportar servicios
export { ProductService } from './services/ProductService';

// Infrastructure
export { productRepository, CATEGORIES, SORT_OPTIONS } from './infrastructure/ProductRepository';

// Hooks
export { useProductFilters } from './hooks/useProductFilters';
export { useProductCatalog, useProduct, useProductSearch, useProductsByCategory } from './hooks/useProductApi';

// Components
export { default as ProductCard } from './components/ProductCard/ProductCard';
export { default as ProductCatalogApi } from './components/ProductCatalogApi/ProductCatalogApi';

// Pages
export { default as ProductDetail } from './pages/ProductDetail';