import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import { AuthProvider, ForgotPassword, LoginPage as Login, RegisterPage as Register, VerificationCode } from './modules/auth';
import { ClientDashboard, Dashboard } from './modules/core';
import { ProductDetail } from './modules/products';

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
          {/* Redirect from root to client dashboard */}
          <Route path="/" element={<Navigate to="/client/dashboard" replace />} />
          
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<TemporaryPage title="Gestión de Usuarios" />} />
            <Route path="products" element={<TemporaryPage title="Gestión de Productos" />} />
            <Route path="orders" element={<TemporaryPage title="Gestión de Pedidos" />} />
            <Route path="settings" element={<TemporaryPage title="Configuración" />} />
          </Route>
          
          {/* Client routes - Solo para usuarios client */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          
          {/* Product detail - Accesible para usuarios autenticados */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
