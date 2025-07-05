# Client Dashboard Components

Esta carpeta contiene todos los componentes específicos del dashboard del cliente, refactorizados desde el archivo original `ClientDashboard.tsx` que tenía 442 líneas.

## Estructura de Componentes

### `Header.tsx`
- Maneja la navegación y autenticación
- Muestra información del usuario logueado
- Enlaces de registro e inicio de sesión
- Responsive design para mobile y desktop

### `Banner.tsx`
- Banner promocional del supermercado
- Información sobre descuentos y envío gratis
- Diseño responsive

### `Filters.tsx`
- Filtros de búsqueda por texto
- Filtros por categoría
- Opciones de ordenamiento
- Diseño responsive con diferentes layouts para mobile/desktop

### `ShoppingCart.tsx`
- Muestra los productos en el carrito
- Calcula subtotal, descuentos y envío
- Botón de compra que redirige a WhatsApp
- Maneja la lógica de precios

### `ProductCard.tsx`
- Tarjeta individual de producto
- Selector de cantidad
- Botón de agregar al carrito
- Badge para productos nuevos

### `ProductGrid.tsx`
- Grid responsivo de productos
- Renderiza múltiples ProductCard
- Maneja el estado vacío

## Hooks Personalizados

### `useProductFilters.ts`
- Lógica de filtrado y ordenamiento de productos
- Memoización para optimización de rendimiento

### `useShoppingCart.ts`
- Estado del carrito de compras
- Funciones para agregar, remover y actualizar productos
- Manejo de cantidades

## Datos

### `products.ts`
- Interfaces TypeScript para Product y CartItem
- Datos de productos (temporales)
- Constantes de categorías y opciones de ordenamiento

## Beneficios de la Refactorización

1. **Mantenibilidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras partes de la app
3. **Testabilidad**: Es más fácil escribir tests para componentes pequeños
4. **Legibilidad**: El código es más fácil de entender y navegar
5. **Rendimiento**: Los hooks personalizados optimizan el re-renderizado

## Uso

```tsx
import {
  Header,
  Banner,
  Filters,
  ShoppingCart,
  ProductGrid
} from '../../components/client-dashboard';
import { useProductFilters, useShoppingCart } from '../../hooks';

const ClientDashboard = () => {
  // Lógica del componente principal
  return (
    <div>
      <Header />
      <Banner />
      <Filters {...filterProps} />
      <ShoppingCart cart={cart} />
      <ProductGrid {...gridProps} />
    </div>
  );
}; 