import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './shared/routes/ProtectedRoute';
import AdminLayout from './shared/components/layout/AdminLayout/AdminLayout';
import { AuthProvider, ForgotPassword, LoginPage as Login, RegisterPage as Register, VerificationCode } from './modules/auth';
import { ProductCatalog } from './modules/core';
import { ProductDetail } from './modules/products';
import { PurchaseSummaryPage } from './modules/shopping-cart';

// Componentes temporales para las páginas que aún no existen
const TemporaryPage = ({ title }: { title: string }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Esta página está en construcción.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect from root to catalog */}
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          
          {/* Admin routes - Solo para usuarios admin */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            {/* Dashboard route removed */}
            <Route path="users" element={<TemporaryPage title="Gestión de Usuarios" />} />
            <Route path="products" element={<TemporaryPage title="Gestión de Productos" />} />
            <Route path="orders" element={<TemporaryPage title="Gestión de Pedidos" />} />
            <Route path="settings" element={<TemporaryPage title="Configuración" />} />
          </Route>
          
          {/* Product catalog - Accesible para todos los usuarios */}
          <Route path="/catalog" element={<ProductCatalog />} />
          
          {/* Product detail - Accesible para usuarios autenticados */}
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Purchase summary - Accesible para todos los usuarios */}
          <Route path="/cart" element={<PurchaseSummaryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
