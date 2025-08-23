import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const AdminLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/admin/tickets', icon: 'bi-ticket-perforated', label: 'Tickets' },
    { path: '/admin/users', icon: 'bi-people', label: 'Users' },
    { path: '/admin/reports', icon: 'bi-graph-up', label: 'Reports' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div 
        className={`bg-dark text-white ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}
        style={{ width: '250px', minHeight: '100vh' }}
      >
        <div className="p-3 border-bottom border-secondary">
          <h4 className="mb-0">
            <i className="bi bi-shield-check me-2"></i>
            Admin Panel
          </h4>
        </div>
        
        <nav className="p-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-light d-flex align-items-center py-2 px-3 mb-1 rounded ${
                isActive(item.path) ? 'bg-primary' : 'text-light hover-bg-secondary'
              }`}
              style={{ textDecoration: 'none' }}
            >
              <i className={`${item.icon} me-2`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-fill">
        {/* Top Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <button
              className="btn btn-outline-secondary d-md-none"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            
            <span className="navbar-brand mb-0 h1 ms-2 d-none d-md-block">
              Helpdesk Management System
            </span>

            <div className="ms-auto d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {auth?.role} Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">Signed in as</small><br />
                      <strong>{auth?.role}</strong>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 70px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;