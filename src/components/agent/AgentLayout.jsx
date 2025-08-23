import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const AgentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/agent', icon: 'bi-speedometer2', label: 'Dashboard', exact: true },
    { path: '/agent/all-tickets', icon: 'bi-ticket-perforated', label: 'All Tickets' },
    { path: '/agent/my-tickets', icon: 'bi-person-check', label: 'My Tickets' },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-dark text-white vh-100 ${sidebarCollapsed ? 'collapsed-sidebar' : 'sidebar'}`} 
           style={{ 
             width: sidebarCollapsed ? '70px' : '250px',
             transition: 'width 0.3s ease',
             position: 'fixed',
             zIndex: 1000
           }}>
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <i className="bi bi-headset fs-4 me-2"></i>
            {!sidebarCollapsed && <span className="fs-5 fw-bold">Agent Panel</span>}
          </div>
        </div>
        
        <nav className="mt-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`d-flex align-items-center text-decoration-none text-white p-3 sidebar-item ${
                (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                  ? 'active bg-primary'
                  : ''
              }`}
              style={{ 
                borderLeft: (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                  ? '4px solid #fff' 
                  : 'none'
              }}
            >
              <i className={`${item.icon} fs-5`}></i>
              {!sidebarCollapsed && <span className="ms-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: sidebarCollapsed ? '70px' : '250px', transition: 'margin-left 0.3s ease' }}>
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
          <button 
            className="btn btn-outline-secondary me-3"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className="bi bi-list"></i>
          </button>
          
          <span className="navbar-brand mb-0 h1">Helpdesk - Agent Panel</span>
          
          <div className="ms-auto d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" 
                      data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-2"></i>
                <span>Agent</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><h6 className="dropdown-header">Role: {auth?.role}</h6></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <style jsx>{`
        .sidebar-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .sidebar-item.active:hover {
          background-color: #0d6efd !important;
        }
      `}</style>
    </div>
  );
};

export default AgentLayout;