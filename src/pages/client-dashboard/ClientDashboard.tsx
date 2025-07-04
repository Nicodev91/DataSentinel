import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Datos Temporales de productos
const PRODUCTS = [
  // Lácteos
  { id: 1, name: 'Leche Entera Colun 1L', price: 990, image: 'https://santaisabel.vtexassets.com/arquivos/ids/295371/Leche-entera-1-L.jpg?v=638240207839630000', category: 'Lácteos', isNew: false },
  { id: 2, name: 'Leche Descremada Soprole 1L', price: 980, image: 'https://santaisabel.vtexassets.com/arquivos/ids/289617/Leche-descremada-natural-1-L.jpg?v=638215704462370000', category: 'Lácteos', isNew: false },
  { id: 3, name: 'Yogur Batido Frutilla Soprole 1kg', price: 2200, image: 'https://unimarc.vtexassets.com/arquivos/ids/222695/000000000401657001-UN-02.jpg?v=637762404859000000', category: 'Lácteos', isNew: false },
  { id: 4, name: 'Yogur Natural Danone 125g', price: 450, image: '/products-san-nicolas/danone.webp', category: 'Lácteos', isNew: false },
  { id: 5, name: 'Queso Gauda Quillayes 250g', price: 2500, image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhMSExEWERAWFhISFxcVFRYWFRMVFhYWGBcSGRUYHyghGR0lGxUVITEhJSkrLi4uFx8zODMtNygtMCsBCgoKDg0OGxAQGy0lICUtLS0tLS0tKy8tLS0tLS0tLS0tLS0tLy8vLS0tLS0tLS8tLy0tLi0tLS0tLS0tLS0tLf/AABEIAKEBOQMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EAD4QAAIBAgQEAwUGBAUEAwAAAAECAAMRBBIhMQUTQVEiYXEGMoGRoSNCUrHR8BRyksEzYoKi4QcVc/EWNEP/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QANREAAgECBAMGBAYDAAMAAAAAAAECAxEEEiExQVFhBRMiMnHwgaGx0UJSkcHh8RQjYgYVM//aAAwDAQACEQMRAD8A+4wBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEA1tWUdRANTYxfMztgQsZxunT990p/wA7AfmRItpbstp0alTyRb9EUmL9ucMu1Uv/AONWI/qsB9ZB1oI2w7KxUt429X+25Y8M4sK6CrScsuxB3U/hI7ycZKSujJXw86E8k0XWHr5h2PUTpQboAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAf/2Q==', category: 'Lácteos', isNew: false },
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
  const { isAuthenticated, isClient, user, logout } = useAuth();
  const [category, setCategory] = useState<string>('Todos');
  const [sort, setSort] = useState<string>('default');
  const [search, setSearch] = useState<string>('');
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

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

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    const quantity = quantities[product.id] || 1;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    // Opcional: resetear a 1 después de agregar
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal < 25000 ? 5000 : 0;
  
  // Aplicar descuento del 5% solo para clientes logueados
  const discount = isClient ? subtotal * 0.05 : 0;
  const totalAfterDiscount = subtotal - discount;
  const total = totalAfterDiscount + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con enlace de login */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-green-700">Supermercado San Nicolás</div>
          <div className="text-sm text-gray-600 font-bold">Registrate y obtén un 5% de descuento en todas tus compras!</div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-gray-600">
                  Bienvenido, {user?.name}
                  {isClient && <span className="ml-2 text-green-600 font-medium">(Cliente con 5% descuento en todas las compras!)</span>}
                </div>
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white! px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Registrarse
                </Link>
                <Link 
                  to="/login" 
                  className="bg-green-600 hover:bg-green-700 text-white! px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

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

      {/* Carrito de compras */}
      <div className="max-w-5xl mx-auto mt-8 mb-4 bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-2">Carrito de compras</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()} CLP</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 space-y-1 text-right">
          <div className="text-gray-600">
            Subtotal: ${subtotal.toLocaleString()} CLP
          </div>
          {discount > 0 && (
            <div className="text-green-600 font-medium">
              Descuento cliente (5%): -${discount.toLocaleString()} CLP
            </div>
          )}
          {shippingCost > 0 && (
            <div className="text-orange-600 font-medium">
              Envío: ${shippingCost.toLocaleString()} CLP
            </div>
          )}
          {shippingCost === 0 && subtotal > 0 && (
            <div className="text-green-600 font-medium">
              ¡Envío gratis!
            </div>
          )}
          <div className="font-bold text-lg">
            Total: ${total.toLocaleString()} CLP
          </div>
        </div>
        {cart.length > 0 && (
          <div className="w-full flex justify-end mt-4"> 
            <a
              href={`https://wa.me/56948853814?text=${encodeURIComponent(
                `Hola, quiero comprar:\n` +
                cart.map(item => `- ${item.name} x${item.quantity} (${(item.price * item.quantity).toLocaleString()} CLP)`).join('\n') +
                `\nSubtotal: ${subtotal.toLocaleString()} CLP` +
                (discount > 0 ? `\nDescuento cliente (5%): -${discount.toLocaleString()} CLP` : '') +
                (shippingCost > 0 ? `\nEnvío: ${shippingCost.toLocaleString()} CLP` : '\n¡Envío gratis!') +
                `\nTotal: ${total.toLocaleString()} CLP`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 !text-white font-bold py-2 px-6 rounded transition"
            >
              Comprar
            </a>
          </div>
        )}
      </div>

      {/* Grid de productos */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 pb-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between relative h-full">
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-3" />
            <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
            <p className="text-green-700 font-bold text-xl mb-2">
              ${product.price.toFixed(0)} CLP
            </p>
            <div className="mt-auto">
              <label htmlFor={`quantity-${product.id}`} className="mr-2 text-sm">Cantidad:</label>
              <select
                id={`quantity-${product.id}`}
                className="border rounded px-2 py-1"
                value={quantities[product.id] || 1}
                onChange={e => handleQuantityChange(product.id, Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button
              className="mt-4 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition font-semibold"
              onClick={() => handleAddToCart(product)}
            >
              Agregar
            </button>
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