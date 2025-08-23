import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const EmployeeDashboard = () => {
  const { getAuthHeaders } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    newTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    recentTickets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/employee/tickets', {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const tickets = await response.json();
        
        // Calculate statistics
        const totalTickets = tickets.length;
        const newTickets = tickets.filter(ticket => ticket.status === 'New').length;
        const inProgressTickets = tickets.filter(ticket => ticket.status === 'In Progress').length;
        const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved').length;
        
        // Get recent tickets (last 5)
        const recentTickets = tickets.slice(0, 5);

        setDashboardData({
          totalTickets,
          newTickets,
          inProgressTickets,
          resolvedTickets,
          recentTickets
        });
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Something went wrong while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-primary';
      case 'In Progress':
        return 'bg-warning text-dark';
      case 'Resolved':
        return 'bg-success';
      case 'Closed':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-danger';
      case 'medium':
        return 'bg-warning text-dark';
      case 'low':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Employee Dashboard</h2>
          <p className="text-muted mb-0">Welcome to your helpdesk portal</p>
        </div>
        <Link to="/employee/create-ticket" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Ticket
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <i className="bi bi-ticket-perforated fs-4 text-primary"></i>
              </div>
              <div>
                <h5 className="card-title mb-1">{dashboardData.totalTickets}</h5>
                <p className="card-text text-muted small mb-0">Total Tickets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <i className="bi bi-clock fs-4 text-info"></i>
              </div>
              <div>
                <h5 className="card-title mb-1">{dashboardData.newTickets}</h5>
                <p className="card-text text-muted small mb-0">New Tickets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <i className="bi bi-gear fs-4 text-warning"></i>
              </div>
              <div>
                <h5 className="card-title mb-1">{dashboardData.inProgressTickets}</h5>
                <p className="card-text text-muted small mb-0">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <i className="bi bi-check-circle fs-4 text-success"></i>
              </div>
              <div>
                <h5 className="card-title mb-1">{dashboardData.resolvedTickets}</h5>
                <p className="card-text text-muted small mb-0">Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-clock-history me-2"></i>
              Recent Tickets
            </h5>
            <Link to="/employee/tickets" className="btn btn-outline-primary btn-sm">
              View All Tickets
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          {dashboardData.recentTickets.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-ticket-perforated fs-1 text-muted mb-3"></i>
              <p className="text-muted">No tickets found</p>
              <Link to="/employee/create-ticket" className="btn btn-primary">
                Create Your First Ticket
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>
                        <span className="badge bg-light text-dark">#{ticket.id}</span>
                      </td>
                      <td>
                        <Link 
                          to={`/employee/tickets/${ticket.id}`} 
                          className="text-decoration-none fw-medium"
                        >
                          {ticket.title}
                        </Link>
                      </td>
                      <td>
                        <span className="text-muted">{ticket.category}</span>
                      </td>
                      <td>
                        <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;