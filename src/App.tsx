import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import './App.css';
import Login from './pages/login-page/LoginPage';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import VerificationCode from './pages/forgot-password/VerificationCode';
import Dashboard from './pages/dashboard/Dashboard';
import ClientDashboard from './pages/client-dashboard/ClientDashboard';
// import ProtectedRoute from './components/auth/ProtectedRoute';

// Componentes temporales para las páginas que aún no existen
const TemporaryPage = ({ title }: { title: string }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Esta página está en construcción.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
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
        {/* Client dashboard route */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
