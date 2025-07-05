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

// Datos Temporales de productos
export const PRODUCTS: Product[] = [
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

export const CATEGORIES = [
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

export const SORT_OPTIONS = [
  { label: 'Por defecto', value: 'default' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
  { label: 'Nombre: A-Z', value: 'name-asc' },
  { label: 'Nombre: Z-A', value: 'name-desc' }
]; 