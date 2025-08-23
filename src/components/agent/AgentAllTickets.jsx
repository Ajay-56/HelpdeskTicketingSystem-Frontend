import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const AgentAllTickets = () => {
  const { getAuthHeaders } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    priority: '',
    sort: 'createdAt,desc'
  });
  const [assigningTicket, setAssigningTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:8080/api/agent/tickets?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
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

  const assignTicketToSelf = async (ticketId) => {
    try {
      setAssigningTicket(ticketId);
      const response = await fetch(`http://localhost:8080/api/agent/tickets/${ticketId}/assign/self`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        await fetchTickets(); // Refresh the tickets list
        alert('Ticket assigned to you successfully!');
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      alert('Error assigning ticket. Please try again.');
    } finally {
      setAssigningTicket(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Open': 'bg-warning text-dark',
      'In Progress': 'bg-info text-white',
      'Resolved': 'bg-success text-white',
      'Closed': 'bg-secondary text-white'
    };
    return `badge ${statusClasses[status] || 'bg-secondary text-white'}`;
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'Low': 'bg-success text-white',
      'Medium': 'bg-warning text-dark',
      'High': 'bg-danger text-white'
    };
    return `badge ${priorityClasses[priority] || 'bg-secondary text-white'}`;
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      priority: '',
      sort: 'createdAt,desc'
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">All Tickets</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={resetFilters}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Reset Filters
          </button>
          <button className="btn btn-primary" onClick={fetchTickets}>
            <i className="bi bi-arrow-repeat me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search tickets..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Account">Account</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="createdAt,desc">Newest First</option>
                <option value="createdAt,asc">Oldest First</option>
                <option value="priority,desc">Priority High to Low</option>
                <option value="priority,asc">Priority Low to High</option>
                <option value="status,asc">Status A-Z</option>
                <option value="status,desc">Status Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card">
        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Tickets ({tickets.length})</h5>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox text-muted fs-1 mb-3"></i>
              <p className="text-muted">No tickets found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Employee</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="fw-bold text-primary">#{ticket.id}</td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: '200px' }}>
                          <strong>{ticket.title}</strong>
                        </div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                          {ticket.description}
                        </small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-circle text-muted me-2"></i>
                          <div>
                            <div className="fw-semibold">{ticket.employee?.name}</div>
                            <small className="text-muted">{ticket.employee?.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {ticket.category}
                        </span>
                      </td>
                      <td>
                        <span className={getPriorityBadge(ticket.priority)}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadge(ticket.status)}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        {ticket.agent ? (
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person-check text-success me-2"></i>
                            <span className="text-success fw-semibold">{ticket.agent.name}</span>
                          </div>
                        ) : (
                          <span className="text-muted">
                            <i className="bi bi-person-dash me-1"></i>
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="text-muted">
                        <div>{new Date(ticket.createdAt).toLocaleDateString()}</div>
                        <small>{new Date(ticket.createdAt).toLocaleTimeString()}</small>
                      </td>
                      <td>
                        {!ticket.agent && ticket.status === 'Open' ? (
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => assignTicketToSelf(ticket.id)}
                            disabled={assigningTicket === ticket.id}
                          >
                            {assigningTicket === ticket.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1"></span>
                                Assigning...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-person-plus me-1"></i>
                                Assign to Me
                              </>
                            )}
                          </button>
                        ) : ticket.agent ? (
                          <span className="text-success small">
                            <i className="bi bi-check-circle me-1"></i>
                            Assigned
                          </span>
                        ) : (
                          <span className="text-muted small">In Progress</span>
                        )}
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

export default AgentAllTickets;