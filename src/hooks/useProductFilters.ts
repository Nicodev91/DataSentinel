import { useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';

export const useProductFilters = (
  category: string,
  sort: string,
  search: string
) => {
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((p: Product) =>
      (category === 'Todos' || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    
    switch (sort) {
      case 'price-asc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    return filtered;
  }, [category, sort, search]);

  return filteredProducts;
};