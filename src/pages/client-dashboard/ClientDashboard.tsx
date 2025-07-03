import React, { useState, useMemo } from 'react';

// Datos Temporales de productos
const PRODUCTS = [
  // Lácteos
  { id: 1, name: 'Leche Entera Colun 1L', price: 990, image: 'https://santaisabel.vtexassets.com/arquivos/ids/295371/Leche-entera-1-L.jpg?v=638240207839630000', category: 'Lácteos', isNew: false },
  { id: 2, name: 'Leche Descremada Soprole 1L', price: 980, image: 'https://santaisabel.vtexassets.com/arquivos/ids/289617/Leche-descremada-natural-1-L.jpg?v=638215704462370000', category: 'Lácteos', isNew: false },
  { id: 3, name: 'Yogur Batido Frutilla Soprole 1kg', price: 2200, image: 'https://unimarc.vtexassets.com/arquivos/ids/222695/000000000401657001-UN-02.jpg?v=637762404859000000', category: 'Lácteos', isNew: false },
  { id: 4, name: 'Yogur Natural Danone 125g', price: 450, image: '/products-san-nicolas/danone.webp', category: 'Lácteos', isNew: false },
  { id: 5, name: 'Queso Gauda Quillayes 250g', price: 2500, image: 'data:image/jpeg;base64,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', category: 'Lácteos', isNew: false },
  { id: 6, name: 'Quesillo Colún 300g', price: 2100, image: '', category: 'Lácteos', isNew: false },
  { id: 7, name: 'Mantequilla Soprole con sal 250g', price: 2300, image: '', category: 'Lácteos', isNew: false },
  { id: 8, name: 'Crema para batir Nestlé 200ml', price: 1600, image: '', category: 'Lácteos', isNew: false },

  // Carnes y Embutidos
  { id: 9, name: 'Carne Molida 90/10 1kg', price: 6800, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 10, name: 'Pollo Entero Asado', price: 3200, image: 'https://tofuu.getjusto.com/orioneat-local/resized2/J5ETmbCkmkPAbxK9G-2400-x.webp', category: 'Carnes y Embutidos', isNew: false },
  { id: 11, name: 'Filete de Pescado Merluza 1kg', price: 5400, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 12, name: 'Vienesas Llanquihue 6 unidades', price: 1200, image: '', category: 'Carnes y Embutidos', isNew: false },
  { id: 13, name: 'Jamón de Pierna PF 200g', price: 1500, image: '', category: 'Carnes y Embutidos', isNew: false },

  // Frutas
  { id: 14, name: 'Plátanos 1kg', price: 1300, image: 'https://cdnx.jumpseller.com/maifud/image/41302893/731428A0-B1B4-40A8-9CF0-540967CD7682.jpeg?1722457887', category: 'Frutas', isNew: false },
  { id: 15, name: 'Manzanas Fuji 1kg', price: 1450, image: '', category: 'Frutas', isNew: false },
  { id: 16, name: 'Peras Packham 1kg', price: 1350, image: '', category: 'Frutas', isNew: false },
  { id: 17, name: 'Naranjas 1kg', price: 1100, image: '', category: 'Frutas', isNew: false },
  { id: 18, name: 'Uvas Verdes 500g', price: 1900, image: '', category: 'Frutas', isNew: false },
  { id: 19, name: 'Kiwis 1kg', price: 2100, image: '', category: 'Frutas', isNew: false },
  { id: 20, name: 'Frutillas 500g', price: 2500, image: '', category: 'Frutas', isNew: true },

  // Verduras
  { id: 21, name: 'Zanahoria 1kg', price: 1000, image: '', category: 'Verduras', isNew: false },
  { id: 22, name: 'Lechuga Escarola', price: 1200, image: '', category: 'Verduras', isNew: false },
  { id: 23, name: 'Pimentón Rojo unidad', price: 900, image: 'https://media.falabella.com/tottusCL/05014416_1/w=1500,h=1500,fit=pad', category: 'Verduras', isNew: false },
  { id: 24, name: 'Tomates 1kg', price: 1500, image: '', category: 'Verduras', isNew: false },
  { id: 25, name: 'Cebolla Morada 1kg', price: 1100, image: '', category: 'Verduras', isNew: false },
  { id: 26, name: 'Espinaca Bolsa 300g', price: 1500, image: '', category: 'Verduras', isNew: false },
  { id: 27, name: 'Ajo 250g', price: 1300, image: '', category: 'Verduras', isNew: false },

  // Panadería
  { id: 28, name: 'Pan Batido 1kg', price: 1800, image: '', category: 'Panadería', isNew: false },
  { id: 29, name: 'Marraqueta 4 unidades', price: 700, image: '', category: 'Panadería', isNew: false },
  { id: 30, name: 'Pan Integral Bimbo 500g', price: 1900, image: 'https://cdn1.totalcommerce.cloud/mercacentro/product-zoom/es/pan-bimbo-artesano-integral-500-g-1.webp', category: 'Panadería', isNew: false },
  { id: 31, name: 'Croissants rellenos 2 unidades', price: 1500, image: '', category: 'Panadería', isNew: true },
  { id: 32, name: 'Pan de Molde Blanco Ideal', price: 1500, image: '', category: 'Panadería', isNew: false },

  // Snacks y Galletas
  { id: 33, name: 'Papas Fritas Lays 160g', price: 1800, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 34, name: 'Galletas Tritón Chocolate', price: 1200, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 35, name: 'Chocman individual', price: 500, image: '/products-san-nicolas/chocman.jpeg', category: 'Snacks y Galletas', isNew: false },
  { id: 36, name: 'Cereal Bar Quaker', price: 650, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 37, name: 'Doritos Queso 160g', price: 1900, image: '', category: 'Snacks y Galletas', isNew: false },
  { id: 38, name: 'Maní salado 100g', price: 1000, image: '', category: 'Snacks y Galletas', isNew: false },

  // Bebidas
  { id: 39, name: 'Coca-Cola 1.5L', price: 1700, image: 'https://www.supermercadodiez.cl/image/cache/catalog/productos/7801610001622-500x500.jpg', category: 'Bebidas', isNew: false },
  { id: 40, name: 'Pepsi Zero 1.5L', price: 1600, image: '', category: 'Bebidas', isNew: false },
  { id: 41, name: 'Sprite 1.5L', price: 1600, image: '', category: 'Bebidas', isNew: false },
  { id: 42, name: 'Jugo Andina Durazno 1L', price: 1300, image: '', category: 'Bebidas', isNew: false },
  { id: 43, name: 'Agua Mineral Puyehue sin gas', price: 1200, image: '', category: 'Bebidas', isNew: false },
  { id: 44, name: 'Red Bull 250ml', price: 1800, image: '', category: 'Bebidas', isNew: false },
  { id: 45, name: 'Té Lipton 20 bolsitas', price: 1400, image: '', category: 'Bebidas', isNew: false },
  { id: 46, name: 'Café Gold Nescafé 100g', price: 3200, image: '', category: 'Bebidas', isNew: false },

  // Licores
  { id: 47, name: 'Pisco Mistral 35° 700ml', price: 6990, image: 'https://los-alpes.cl/wp-content/uploads/2022/04/660041001-600x601.jpg', category: 'Licores', isNew: false },
  { id: 48, name: 'Whisky Red Label 750ml', price: 12500, image: '', category: 'Licores', isNew: false },
  { id: 49, name: 'Vodka Absolut 750ml', price: 8900, image: '', category: 'Licores', isNew: false },
  { id: 50, name: 'Cerveza Corona 355ml', price: 1500, image: '', category: 'Licores', isNew: false },
  { id: 51, name: 'Vino Gato Tinto 750ml', price: 2500, image: '', category: 'Licores', isNew: false },
  { id: 52, name: 'Espumante Valdivieso 750ml', price: 4600, image: '', category: 'Licores', isNew: false },

  // Despensa
  { id: 53, name: 'Arroz Tucapel 1kg', price: 1600, image: 'https://unimarc.vtexassets.com/arquivos/ids/217082/000000000000006126-UN-02.jpg?v=637608388904270000', category: 'Despensa', isNew: false },
  { id: 54, name: 'Fideos Carozzi Spaghetti 400g', price: 950, image: '', category: 'Despensa', isNew: false },
  { id: 55, name: 'Azúcar Iansa 1kg', price: 1300, image: '', category: 'Despensa', isNew: false },
  { id: 56, name: 'Sal Lobos Fina 1kg', price: 600, image: '', category: 'Despensa', isNew: false },
  { id: 57, name: 'Aceite Maravilla 1L', price: 2800, image: '', category: 'Despensa', isNew: false },
  { id: 58, name: 'Salsa de Tomate 500g', price: 1200, image: '', category: 'Despensa', isNew: false },
  { id: 59, name: 'Lentejas 500g', price: 1700, image: '', category: 'Despensa', isNew: false },

  // Congelados
  { id: 60, name: 'Papas Prefritas McCain 1kg', price: 2700, image: '', category: 'Congelados', isNew: false },
  { id: 61, name: 'Empanadas de Jamón y Queso 6 unid.', price: 3900, image: 'https://alimentosdelpedregal.com/la-dehesa/wp-content/uploads/2024/03/EMPANADAS-MEDIALUNA-JAMON-QUESO-6-UN.-DP-450x450.jpg', category: 'Congelados', isNew: false },
  { id: 62, name: 'Pizza Familiar Napolitana', price: 4990, image: '', category: 'Congelados', isNew: false },
  { id: 63, name: 'Mix Verduras Salteadas 500g', price: 2100, image: '', category: 'Congelados', isNew: false },

  // Limpieza y Hogar
  { id: 64, name: 'Detergente Ariel 3L', price: 5200, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 65, name: 'Lavaloza Quix Limón 750ml', price: 1200, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 66, name: 'Papel Higiénico Elite 12 rollos', price: 5900, image: '', category: 'Limpieza y Hogar', isNew: false },
  { id: 67, name: 'Cloro Clorinda 1L', price: 850, image: 'https://www.prisa.cl/media/cache/attachment/filter/product_gallery_main/b6b1adc76b36bd6a7f81344215e93277/62682/6321126332f7e424120651.png', category: 'Limpieza y Hogar', isNew: false },
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