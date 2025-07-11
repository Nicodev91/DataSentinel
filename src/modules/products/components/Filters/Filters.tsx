import React from 'react';
import type { ProductFilter } from '../../domain/Product';
import { SORT_OPTIONS } from '../../infrastructure/ProductRepository';

interface FiltersProps {
  filters: ProductFilter;
  onFilterChange: (key: keyof ProductFilter, value: string) => void;
  onResetFilters: () => void;
  categories?: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onResetFilters, categories = [] }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      {/* Búsqueda y ordenamiento - Mobile */}
      <div className="md:hidden mb-4 space-y-2">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={filters.searchTerm}
          onChange={e => onFilterChange('searchTerm', e.target.value)}
        />
        <select
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={filters.sortBy}
          onChange={e => onFilterChange('sortBy', e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Categorías */}
      <div className="mb-4">
        <div className="flex gap-1 md:gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full border text-xs md:text-sm font-medium transition ${filters.category === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-100'}`}
              onClick={() => onFilterChange('category', cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Búsqueda y ordenamiento - Desktop */}
      <div className="hidden md:flex gap-2 items-center justify-end">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={filters.searchTerm}
          onChange={e => onFilterChange('searchTerm', e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={filters.sortBy}
          onChange={e => onFilterChange('sortBy', e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={onResetFilters}
          className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default Filters;