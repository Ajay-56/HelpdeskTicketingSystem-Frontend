import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const EmployeeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, auth } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3 border-bottom border-secondary">
          <h4 className="mb-0">
            <i className="bi bi-person-workspace me-2"></i>
            Employee Panel
          </h4>
        </div>
        
        <nav className="nav flex-column p-3">
          <Link 
            to="/employee/dashboard" 
            className={`nav-link text-white mb-2 rounded ${isActive('/employee/dashboard') ? 'bg-primary' : ''}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
          
          <Link 
            to="/employee/tickets" 
            className={`nav-link text-white mb-2 rounded ${isActive('/employee/tickets') ? 'bg-primary' : ''}`}
          >
            <i className="bi bi-ticket-perforated me-2"></i>
            My Tickets
          </Link>
          
          <Link 
            to="/employee/create-ticket" 
            className={`nav-link text-white mb-2 rounded ${isActive('/employee/create-ticket') ? 'bg-primary' : ''}`}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Create Ticket
          </Link>
        </nav>

        {/* User Info & Logout */}
        <div className="mt-auto p-3 border-top border-secondary">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <div className="small">
              <div className="fw-semibold">{auth?.email}</div>
              <div className="text-muted">Employee</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm w-100"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-fill">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;