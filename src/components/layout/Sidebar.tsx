import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({isActive}) => isActive ? 'active' : ''}>
              <i className="fas fa-users"></i>
              <span>Usuarios</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''}>
              <i className="fas fa-box"></i>
              <span>Productos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({isActive}) => isActive ? 'active' : ''}>
              <i className="fas fa-shopping-cart"></i>
              <span>Pedidos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>
              <i className="fas fa-cog"></i>
              <span>Configuración</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
