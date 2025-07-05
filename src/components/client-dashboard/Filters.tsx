import React from 'react';
import { CATEGORIES, SORT_OPTIONS } from '../../data/products';

interface FiltersProps {
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  category,
  setCategory,
  sort,
  setSort,
  search,
  setSearch
}) => {
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 md:px-2">
      {/* Búsqueda y ordenamiento - Mobile */}
      <div className="md:hidden mb-4 space-y-2">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Categorías */}
      <div className="mb-4">
        <div className="flex gap-1 md:gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full border text-xs md:text-sm font-medium transition ${category === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-100'}`}
              onClick={() => setCategory(cat)}
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
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters; 