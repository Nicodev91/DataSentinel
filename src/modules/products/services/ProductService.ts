import type { Product, ProductFilter } from '../domain/Product';
import { productRepository } from '../infrastructure/ProductRepository';
import { SORT_OPTIONS } from '../infrastructure/ProductRepository';

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return await productRepository.getAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return await productRepository.getById(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await productRepository.getByCategory(category);
  }

  async searchProducts(term: string): Promise<Product[]> {
    return await productRepository.search(term);
  }

  async getFilteredProducts(filter: ProductFilter): Promise<Product[]> {
    let products: Product[];

    // Filtrar por categoría
    if (filter.category && filter.category !== 'Todos') {
      products = await this.getProductsByCategory(filter.category);
    } else {
      products = await this.getAllProducts();
    }

    // Filtrar por término de búsqueda
    if (filter.searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }

    // Ordenar productos
    products = this.sortProducts(products, filter.sortBy);

    return products;
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts;
    }
  }

  getSortOptions() {
    return SORT_OPTIONS;
  }
}

export const productService = new ProductService();