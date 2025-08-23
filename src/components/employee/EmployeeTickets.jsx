import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const EmployeeTickets = () => {
  const { getAuthHeaders } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter and search states
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    priority: '',
    sort: 'createdAt,desc'
  });

  const [categories] = useState([
    'Technical Issue',
    'Software Bug',
    'Hardware Problem',
    'Account Access',
    'Feature Request',
    'General Inquiry'
  ]);

  const [priorities] = useState(['Low', 'Medium', 'High']);
  const [statuses] = useState(['New', 'In Progress', 'Resolved', 'Closed']);

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.sort) queryParams.append('sort', filters.sort);

      const response = await fetch(
        `http://localhost:8080/api/employee/tickets?${queryParams.toString()}`,
        {
          headers: getAuthHeaders()
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        setError('Failed to fetch tickets');
      }
    } catch (err) {
      setError('Something went wrong while fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      priority: '',
      sort: 'createdAt,desc'
    });
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
            <p>Loading tickets...</p>
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
          <h2 className="mb-1">My Tickets</h2>
          <p className="text-muted mb-0">View and manage your support tickets</p>
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

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Search */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label small text-muted">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, ID..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small text-muted">Status</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small text-muted">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small text-muted">Priority</label>
              <select
                className="form-select"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small text-muted">Sort By</label>
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="createdAt,desc">Newest First</option>
                <option value="createdAt,asc">Oldest First</option>
                <option value="title,asc">Title A-Z</option>
                <option value="title,desc">Title Z-A</option>
                <option value="priority,desc">High Priority First</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="col-lg-1 col-md-6 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
                title="Clear Filters"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tickets Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {tickets.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-ticket-perforated fs-1 text-muted mb-3"></i>
              <p className="text-muted">No tickets found</p>
              {filters.search || filters.status || filters.category || filters.priority ? (
                <button className="btn btn-outline-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              ) : (
                <Link to="/employee/create-ticket" className="btn btn-primary">
                  Create Your First Ticket
                </Link>
              )}
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
                    <th>Agent</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>
                        <span className="badge bg-light text-dark">#{ticket.id}</span>
                      </td>
                      <td>
                        <div>
                          <div className="fw-medium">{ticket.title}</div>
                          {ticket.description && (
                            <small className="text-muted">
                              {ticket.description.length > 50 
                                ? `${ticket.description.substring(0, 50)}...` 
                                : ticket.description
                              }
                            </small>
                          )}
                        </div>
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
                        {ticket.agent ? (
                          <span className="text-success">
                            <i className="bi bi-person-check me-1"></i>
                            {ticket.agent.name}
                          </span>
                        ) : (
                          <span className="text-muted">
                            <i className="bi bi-person-x me-1"></i>
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <Link 
                          to={`/employee/tickets/${ticket.id}`} 
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View
                        </Link>
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

export default EmployeeTickets;