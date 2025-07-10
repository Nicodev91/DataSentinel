export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductFilter {
  category: string;
  sortBy: string;
  searchTerm: string;
}

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
  search(term: string): Promise<Product[]>;
}

export interface CartRepository {
  getCart(): CartItem[];
  addItem(product: Product, quantity: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, quantity: number): void;
  clearCart(): void;
}