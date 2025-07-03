import React, { useState, useMemo } from 'react';

// Datos Temporales de productos
const PRODUCTS = [
  // Lácteos
  { id: 1, name: 'Leche Entera Colun 1L', price: 990, image: '', category: 'Lácteos', isNew: false },
  { id: 2, name: 'Leche Descremada Soprole 1L', price: 980, image: '', category: 'Lácteos', isNew: false },
  { id: 3, name: 'Yogur Batido Frutilla Soprole 1kg', price: 2200, image: '', category: 'Lácteos', isNew: false },
  { id: 4, name: 'Yogur Natural Danone 125g', price: 450, image: '', category: 'Lácteos', isNew: false },
  { id: 5, name: 'Queso Gauda Quillayes 250g', price: 2500, image: '', category: 'Lácteos', isNew: false },
  { id: 6, name: 'Quesillo Colún 300g', price: 2100, image: '', category: 'Lácteos', isNew: false },
  { id: 7, name: 'Mantequilla Soprole con sal 250g', price: 2300, image: '', category: 'Lácteos', isNew: false },
  { id: 8, name: 'Crema para batir Nestlé 200ml', price: 1600, image: '', category: 'Lácteos', isNew: false },

  // Carnes y Embutidos
  { id: 9, name: 'Carne Molida 90/10 1kg', price: 6800, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 10, name: 'Pollo Entero 1kg', price: 3200, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 11, name: 'Filete de Pescado Merluza 1kg', price: 5400, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 12, name: 'Vienesas Llanquihue 6 unidades', price: 1200, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 13, name: 'Jamón de Pierna PF 200g', price: 1500, image: '', category: 'Carnes y Embutidos', isNew: false },

  // Frutas
  { id: 14, name: 'Plátanos 1kg', price: 1300, image: '', category: 'Frutas', isNew: false },
  { id: 15, name: 'Manzanas Fuji 1kg', price: 1450, image: '', category: 'Frutas', isNew: false },
  { id: 16, name: 'Peras Packham 1kg', price: 1350, image: '', category: 'Frutas', isNew: false },
  { id: 17, name: 'Naranjas 1kg', price: 1100, image: '', category: 'Frutas', isNew: false },
  { id: 18, name: 'Uvas Verdes 500g', price: 1900, image: '', category: 'Frutas', isNew: false },
  { id: 19, name: 'Kiwis 1kg', price: 2100, image: '', category: 'Frutas', isNew: false },
  { id: 20, name: 'Frutillas 500g', price: 2500, image: '', category: 'Frutas', isNew: true },

  // Verduras
  { id: 21, name: 'Zanahoria 1kg', price: 1000, image: '', category: 'Verduras', isNew: false },
  { id: 22, name: 'Lechuga Escarola', price: 1200, image: '', category: 'Verduras', isNew: false },
  { id: 23, name: 'Pimentón Rojo unidad', price: 900, image: '', category: 'Verduras', isNew: false },
  { id: 24, name: 'Tomates 1kg', price: 1500, image: '', category: 'Verduras', isNew: false },
  { id: 25, name: 'Cebolla Morada 1kg', price: 1100, image: '', category: 'Verduras', isNew: false },
  { id: 26, name: 'Espinaca Bolsa 300g', price: 1500, image: '', category: 'Verduras', isNew: false },
  { id: 27, name: 'Ajo 250g', price: 1300, image: '', category: 'Verduras', isNew: false },

  // Panadería
  { id: 28, name: 'Pan Batido 1kg', price: 1800, image: '', category: 'Panadería', isNew: false },
  { id: 29, name: 'Marraqueta 4 unidades', price: 700, image: '', category: 'Panadería', isNew: false },
  { id: 30, name: 'Pan Integral Bimbo 500g', price: 1900, image: '', category: 'Panadería', isNew: false },
  { id: 31, name: 'Croissants rellenos 2 unidades', price: 1500, image: '', category: 'Panadería', isNew: true },
  { id: 32, name: 'Pan de Molde Blanco Ideal', price: 1500, image: '', category: 'Panadería', isNew: false },

  // Snacks y Galletas
  { id: 33, name: 'Papas Fritas Lays 160g', price: 1800, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 34, name: 'Galletas Tritón Chocolate', price: 1200, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 35, name: 'Chocman individual', price: 500, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 36, name: 'Cereal Bar Quaker', price: 650, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 37, name: 'Doritos Queso 160g', price: 1900, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 38, name: 'Maní salado 100g', price: 1000, image: '', category: 'Snacks y Galletas', isNew: false },

  // Bebidas
  { id: 39, name: 'Coca-Cola 1.5L', price: 1700, image: '', category: 'Bebidas', isNew: false },
  { id: 40, name: 'Pepsi Zero 1.5L', price: 1600, image: '', category: 'Bebidas', isNew: false },
  { id: 41, name: 'Sprite 1.5L', price: 1600, image: '', category: 'Bebidas', isNew: false },
  { id: 42, name: 'Jugo Andina Durazno 1L', price: 1300, image: '', category: 'Bebidas', isNew: false },
  { id: 43, name: 'Agua Mineral Puyehue sin gas', price: 1200, image: '', category: 'Bebidas', isNew: false },
  { id: 44, name: 'Red Bull 250ml', price: 1800, image: '', category: 'Bebidas', isNew: false },
  { id: 45, name: 'Té Lipton 20 bolsitas', price: 1400, image: '', category: 'Bebidas', isNew: false },
  { id: 46, name: 'Café Gold Nescafé 100g', price: 3200, image: '', category: 'Bebidas', isNew: false },

  // Licores
  { id: 47, name: 'Pisco Mistral 35° 700ml', price: 6990, image: '', category: 'Licores', isNew: false },
  { id: 48, name: 'Whisky Red Label 750ml', price: 12500, image: '', category: 'Licores', isNew: false },
  { id: 49, name: 'Vodka Absolut 750ml', price: 8900, image: '', category: 'Licores', isNew: false },
  { id: 50, name: 'Cerveza Corona 355ml', price: 1500, image: '', category: 'Licores', isNew: false },
  { id: 51, name: 'Vino Gato Tinto 750ml', price: 2500, image: '', category: 'Licores', isNew: false },
  { id: 52, name: 'Espumante Valdivieso 750ml', price: 4600, image: '', category: 'Licores', isNew: false },

  // Despensa
  { id: 53, name: 'Arroz Tucapel 1kg', price: 1600, image: '', category: 'Despensa', isNew: false },
  { id: 54, name: 'Fideos Carozzi Spaghetti 400g', price: 950, image: '', category: 'Despensa', isNew: false },
  { id: 55, name: 'Azúcar Iansa 1kg', price: 1300, image: '', category: 'Despensa', isNew: false },
  { id: 56, name: 'Sal Lobos Fina 1kg', price: 600, image: '', category: 'Despensa', isNew: false },
  { id: 57, name: 'Aceite Maravilla 1L', price: 2800, image: '', category: 'Despensa', isNew: false },
  { id: 58, name: 'Salsa de Tomate 500g', price: 1200, image: '', category: 'Despensa', isNew: false },
  { id: 59, name: 'Lentejas 500g', price: 1700, image: '', category: 'Despensa', isNew: false },

  // Congelados
  { id: 60, name: 'Papas Prefritas McCain 1kg', price: 2700, image: '', category: 'Congelados', isNew: false },
  { id: 61, name: 'Empanadas de queso 6 unid.', price: 3900, image: '', category: 'Congelados', isNew: false },
  { id: 62, name: 'Pizza Familiar Napolitana', price: 4990, image: '', category: 'Congelados', isNew: false },
  { id: 63, name: 'Mix Verduras Salteadas 500g', price: 2100, image: '', category: 'Congelados', isNew: false },

  // Limpieza y Hogar
  { id: 64, name: 'Detergente Ariel 3L', price: 5200, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 65, name: 'Lavaloza Quix Limón 750ml', price: 1200, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 66, name: 'Papel Higiénico Elite 12 rollos', price: 5900, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 67, name: 'Cloro Clorinda 1L', price: 850, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 68, name: 'Esponja Multiuso 3 unidades', price: 1400, image: '', category: 'Limpieza y Hogar', isNew: false },
];

const CATEGORIES = [
  'Todos',
  'Lácteos',
  'Carnes y Embutidos',
  'Frutas',
  'Verduras',
  'Panadería',
  'Snacks y Galletas',
  'Bebidas',
  'Licores',
  'Despensa',
  'Congelados',
  'Limpieza y Hogar'
];
const SORT_OPTIONS = [
  { label: 'Por defecto', value: 'default' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
  { label: 'Nombre: A-Z', value: 'name-asc' },
  { label: 'Nombre: Z-A', value: 'name-desc' }
];

const ClientDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>('Todos');
  const [sort, setSort] = useState<string>('default');
  const [search, setSearch] = useState<string>('');

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(p =>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-green-700 rounded-xl mx-auto mt-6 max-w-5xl flex items-center justify-between px-8 py-6 text-white">
        <div>
          <h2 className="text-2xl font-bold mb-2">Aprovecha <span className="text-yellow-300">los Descuentos y el despacho Gratis</span> que te ofrece Supermercado San Nicolás por compras sobre 25.000 Pesos</h2>
          <p className="mb-3">Solo por tiempo limitado. Promoción Valida solo para la Ciudad de Ovalle</p>
          <button className="bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition">Saber más</button>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-5xl mx-auto mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${category === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-100'}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
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

      {/* Grid de productos */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 pb-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col relative">
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-3" />
            <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
            <p className="text-green-700 font-bold text-xl mb-2">
              ${product.price.toFixed(0)} CLP
            </p>
            <button className="mt-auto bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition font-semibold">Agregar</button>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">No se encontraron productos.</div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard; 