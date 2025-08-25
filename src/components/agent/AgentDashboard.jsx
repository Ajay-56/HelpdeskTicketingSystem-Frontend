import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  const { getAuthHeaders } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    myTickets: 0,
    resolvedTickets: 0,
    pendingTickets: 0
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all tickets
      const allTicketsResponse = await fetch('https://helpdeskticketingsystem.onrender.com/api/agent/tickets', {
        headers: getAuthHeaders()
      });
      const allTickets = await allTicketsResponse.json();
      
      // Fetch my tickets
      const myTicketsResponse = await fetch('https://helpdeskticketingsystem.onrender.com/api/agent/my-tickets', {
        headers: getAuthHeaders()
      });
      const myTickets = await myTicketsResponse.json();
      
      // Calculate dashboard metrics
      setDashboardData({
        totalTickets: allTickets.length,
        myTickets: myTickets.length,
        resolvedTickets: myTickets.filter(ticket => ticket.status === 'Resolved').length,
        pendingTickets: myTickets.filter(ticket => ['Open', 'In Progress'].includes(ticket.status)).length
      });
      
      // Set recent tickets (latest 5)
      setRecentTickets(myTickets.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Agent Dashboard</h1>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-1"></i>
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-primary mb-2">
                <i className="bi bi-ticket-perforated fs-1"></i>
              </div>
              <h3 className="card-title text-primary mb-1">{dashboardData.totalTickets}</h3>
              <p className="card-text text-muted mb-0">Total Tickets</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-info mb-2">
                <i className="bi bi-person-check fs-1"></i>
              </div>
              <h3 className="card-title text-info mb-1">{dashboardData.myTickets}</h3>
              <p className="card-text text-muted mb-0">My Tickets</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-success mb-2">
                <i className="bi bi-check-circle fs-1"></i>
              </div>
              <h3 className="card-title text-success mb-1">{dashboardData.resolvedTickets}</h3>
              <p className="card-text text-muted mb-0">Resolved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-warning mb-2">
                <i className="bi bi-clock-history fs-1"></i>
              </div>
              <h3 className="card-title text-warning mb-1">{dashboardData.pendingTickets}</h3>
              <p className="card-text text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent My Tickets</h5>
              <Link to="/agent/my-tickets" className="btn btn-outline-primary btn-sm">
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="card-body p-0">
              {recentTickets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="fw-bold text-primary">#{ticket.id}</td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: '300px' }}>
                              {ticket.title}
                            </div>
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
                          <td className="text-muted">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox text-muted fs-1 mb-3"></i>
                  <p className="text-muted">No tickets assigned yet</p>
                  <Link to="/agent/all-tickets" className="btn btn-primary">
                    View Available Tickets
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link to="/agent/all-tickets" className="text-decoration-none">
                    <div className="d-flex align-items-center p-3 bg-light rounded hover-bg-primary">
                      <i className="bi bi-ticket-perforated fs-4 text-primary me-3"></i>
                      <div>
                        <h6 className="mb-1">View All Tickets</h6>
                        <small className="text-muted">Browse and assign tickets</small>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-3">
                  <Link to="/agent/my-tickets" className="text-decoration-none">
                    <div className="d-flex align-items-center p-3 bg-light rounded hover-bg-primary">
                      <i className="bi bi-person-check fs-4 text-info me-3"></i>
                      <div>
                        <h6 className="mb-1">My Assigned Tickets</h6>
                        <small className="text-muted">Manage your tickets</small>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-3">
                  <Link to="/agent/my-tickets?status=Open" className="text-decoration-none">
                    <div className="d-flex align-items-center p-3 bg-light rounded hover-bg-primary">
                      <i className="bi bi-clock-history fs-4 text-warning me-3"></i>
                      <div>
                        <h6 className="mb-1">Pending Tickets</h6>
                        <small className="text-muted">Handle urgent tickets</small>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-bg-primary:hover {
          background-color: rgba(13, 110, 253, 0.1) !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default AgentDashboard;