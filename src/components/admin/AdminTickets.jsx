import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const AdminTickets = () => {
  const { getAuthHeaders } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [workload, setWorkload] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showReassignModal, setShowReassignModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchTickets(),
        fetchAgents(),
        fetchWorkload()
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/tickets', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/users/agents', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  };

  const fetchWorkload = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/dashboard/agent-workload', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkload(data);
      }
    } catch (err) {
      console.error('Error fetching workload:', err);
    }
  };

  const handleReassign = async () => {
    if (!selectedTicket || !selectedAgent) return;

    try {
      const response = await fetch(`http://localhost:8080/api/admin/tickets/${selectedTicket.id}/reassign`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newAgentId: parseInt(selectedAgent) }),
      });

      if (response.ok) {
        const message = await response.text();
        alert('✅ ' + message);
        setShowReassignModal(false);
        setSelectedTicket(null);
        setSelectedAgent('');
        fetchData(); // Refresh data
      } else {
        const error = await response.text();
        alert('❌ ' + error);
      }
    } catch (err) {
      console.error('Error reassigning ticket:', err);
      alert('❌ Error reassigning ticket');
    }
  };

  const openReassignModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowReassignModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-info';
      case 'in progress': return 'bg-warning';
      case 'resolved': return 'bg-success';
      case 'closed': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Ticket Management</h1>
        <button 
          className="btn btn-outline-primary"
          onClick={fetchData}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Agent Workload Summary */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-person-workspace me-2"></i>
                Agent Workload Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {Object.entries(workload).length > 0 ? (
                  Object.entries(workload).map(([agentName, count]) => (
                    <div key={agentName} className="col-md-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <div>
                          <h6 className="mb-0">{agentName}</h6>
                          <small className="text-muted">Assigned Tickets</small>
                        </div>
                        <span className={`badge ${count > 10 ? 'bg-warning' : count > 5 ? 'bg-info' : 'bg-success'} fs-6`}>
                          {count}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No workload data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-ticket-perforated me-2"></i>
            All Tickets ({tickets.length})
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Category</th>
                  <th>Employee</th>
                  <th>Agent</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td><strong>#{ticket.id}</strong></td>
                      <td>
                        <div className="fw-medium">{ticket.title}</div>
                        {ticket.description && (
                          <small className="text-muted">
                            {ticket.description.substring(0, 50)}...
                          </small>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority || 'Medium'}
                        </span>
                      </td>
                      <td>{ticket.category}</td>
                      <td>{ticket.employee?.name || 'N/A'}</td>
                      <td>
                        {ticket.agent ? (
                          <span className="badge bg-primary">
                            {ticket.agent.name}
                          </span>
                        ) : (
                          <span className="badge bg-secondary">Unassigned</span>
                        )}
                      </td>
                      <td>
                        <small>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openReassignModal(ticket)}
                          title="Reassign Ticket"
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <i className="bi bi-inbox display-4 text-muted"></i>
                      <p className="text-muted mt-2">No tickets found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reassign Modal */}
      {showReassignModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Reassign Ticket
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowReassignModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <strong>Ticket:</strong> #{selectedTicket?.id} - {selectedTicket?.title}
                </div>
                <div className="mb-3">
                  <strong>Current Agent:</strong> {selectedTicket?.agent?.name || 'Unassigned'}
                </div>
                <div className="mb-3">
                  <label className="form-label">Select New Agent:</label>
                  <select
                    className="form-select"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    <option value="">Choose an agent...</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name} ({workload[agent.name] || 0} tickets)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowReassignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReassign}
                  disabled={!selectedAgent}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Reassign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTickets;