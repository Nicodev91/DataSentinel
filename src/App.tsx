import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import './App.css';
import Login from './pages/login-page/LoginPage';
import Register from './pages/register-page/RegisterPage';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import VerificationCode from './pages/forgot-password/VerificationCode';
import Dashboard from './pages/dashboard/Dashboard';
import ClientDashboard from './pages/client-dashboard/ClientDashboard';
import ProductDetail from './pages/product-detail/ProductDetail';
import { AuthProvider } from './contexts/AuthContext';

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
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<TemporaryPage title="Gestión de Usuarios" />} />
          <Route path="products" element={<TemporaryPage title="Gestión de Productos" />} />
          <Route path="orders" element={<TemporaryPage title="Gestión de Pedidos" />} />
          <Route path="settings" element={<TemporaryPage title="Configuración" />} />
        </Route>
        
        {/* Client routes */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
