import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { getAuthHeaders } = useAuth();
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://helpdeskticketingsystem.onrender.com/api/employee/tickets/${ticketId}`,
        {
          headers: getAuthHeaders()
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTicket(data);
      } else if (response.status === 404) {
        setError('Ticket not found');
      } else if (response.status === 403) {
        setError('Access denied. You can only view your own tickets.');
      } else {
        setError('Failed to fetch ticket details');
      }
    } catch (err) {
      setError('Something went wrong while fetching ticket details');
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
            <p>Loading ticket details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
                <h4 className="mb-3">Error</h4>
                <p className="text-muted mb-4">{error}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/employee/tickets')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Tickets
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={fetchTicketDetails}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Link 
          to="/employee/tickets" 
          className="btn btn-outline-secondary me-3"
        >
          <i className="bi bi-arrow-left"></i>
        </Link>
        <div>
          <h2 className="mb-1">
            Ticket #{ticket.id}
            <span className={`badge ms-3 ${getStatusBadgeClass(ticket.status)}`}>
              {ticket.status}
            </span>
          </h2>
          <p className="text-muted mb-0">Created on {new Date(ticket.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Ticket Details Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-2">{ticket.title}</h5>
                  <div className="d-flex gap-2 flex-wrap">
                    <span className="badge bg-light text-dark">
                      <i className="bi bi-folder me-1"></i>
                      {ticket.category}
                    </span>
                    <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                      <i className="bi bi-flag me-1"></i>
                      {ticket.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-3">Description</h6>
              <div className="bg-light rounded p-3">
                <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
                  {ticket.description}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket History Placeholder */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h6 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Ticket Activity
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-start">
                <div className="flex-shrink-0">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                       style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-plus text-white"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">Ticket Created</h6>
                      <p className="text-muted mb-0">
                        You created this ticket with {ticket.priority.toLowerCase()} priority
                      </p>
                    </div>
                    <small className="text-muted">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>

              {ticket.agent && (
                <div className="d-flex align-items-start mt-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle bg-success d-flex align-items-center justify-content-center" 
                         style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-person-check text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">Agent Assigned</h6>
                        <p className="text-muted mb-0">
                          {ticket.agent.name} has been assigned to your ticket
                        </p>
                      </div>
                      <small className="text-muted">
                        Recently
                      </small>
                    </div>
                  </div>
                </div>
              )}

              {!ticket.agent && ticket.status === 'New' && (
                <div className="text-center py-4">
                  <i className="bi bi-hourglass-split fs-2 text-muted mb-3"></i>
                  <p className="text-muted">
                    Your ticket is waiting to be assigned to an agent.
                    <br />
                    You'll receive an update once someone starts working on it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Ticket Info */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Ticket Information
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small text-muted">Status</label>
                  <div>
                    <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">Priority</label>
                  <div>
                    <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">Category</label>
                  <div>{ticket.category}</div>
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">Created By</label>
                  <div>{ticket.employee?.name || 'You'}</div>
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">Assigned Agent</label>
                  <div>
                    {ticket.agent ? (
                      <span className="text-success">
                        <i className="bi bi-person-check me-1"></i>
                        {ticket.agent.name}
                      </span>
                    ) : (
                      <span className="text-muted">
                        <i className="bi bi-person-x me-1"></i>
                        Not Assigned Yet
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted">Created At</label>
                  <div>{new Date(ticket.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h6 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Actions
              </h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link 
                  to="/employee/tickets" 
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-list me-2"></i>
                  Back to All Tickets
                </Link>
                
                <Link 
                  to="/employee/create-ticket" 
                  className="btn btn-primary"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Create New Ticket
                </Link>
              </div>

              {ticket.status === 'New' && (
                <div className="alert alert-info mt-3 mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  <small>
                    Your ticket is in queue. An agent will review it shortly.
                  </small>
                </div>
              )}

              {ticket.status === 'In Progress' && (
                <div className="alert alert-warning mt-3 mb-0">
                  <i className="bi bi-clock me-2"></i>
                  <small>
                    An agent is working on your ticket. You'll receive updates as progress is made.
                  </small>
                </div>
              )}

              {ticket.status === 'Resolved' && (
                <div className="alert alert-success mt-3 mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  <small>
                    Your ticket has been resolved. If you need further assistance, please create a new ticket.
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;