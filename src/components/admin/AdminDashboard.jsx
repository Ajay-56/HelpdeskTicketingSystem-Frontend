import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const AdminDashboard = () => {
  const { getAuthHeaders } = useAuth();
  const [kpis, setKpis] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/admin/dashboard/kpis', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setKpis(data);
      } else {
        setError('Failed to fetch KPIs');
      }
    } catch (err) {
      console.error('Error fetching KPIs:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className="col-md-6 col-xl-3 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="card-title text-muted mb-1">{title}</h6>
              <h3 className={`mb-0 text-${color}`}>{value || 0}</h3>
              {description && (
                <small className="text-muted">{description}</small>
              )}
            </div>
            <div className={`bg-${color} bg-opacity-10 p-3 rounded-circle`}>
              <i className={`${icon} text-${color} fs-4`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatusCard = ({ statusData }) => (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-pie-chart me-2"></i>
            Tickets by Status
          </h5>
        </div>
        <div className="card-body">
          {statusData && Object.keys(statusData).length > 0 ? (
            Object.entries(statusData).map(([status, count]) => {
              const getStatusColor = (status) => {
                switch (status.toLowerCase()) {
                  case 'new': return 'info';
                  case 'in progress': return 'warning';
                  case 'resolved': return 'success';
                  case 'closed': return 'secondary';
                  default: return 'primary';
                }
              };

              const color = getStatusColor(status);
              return (
                <div key={status} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className={`badge bg-${color} me-2`}></span>
                    <span>{status}</span>
                  </div>
                  <span className={`badge bg-${color}`}>{count}</span>
                </div>
              );
            })
          ) : (
            <p className="text-muted">No status data available</p>
          )}
        </div>
      </div>
    </div>
  );

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
        <h1 className="h3 mb-0">Dashboard</h1>
        <button 
          className="btn btn-outline-primary"
          onClick={fetchKpis}
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

      {/* KPI Cards */}
      <div className="row">
        <StatCard
          title="Total Tickets"
          value={kpis.totalTickets}
          icon="bi-ticket-perforated"
          color="primary"
          description="All time tickets"
        />
        
        <StatCard
          title="Avg Resolution Time"
          value={kpis.averageResolutionTimeHours ? `${Math.round(kpis.averageResolutionTimeHours)}h` : '0h'}
          icon="bi-clock-history"
          color="info"
          description="Hours to resolve"
        />

        <StatCard
          title="Active Tickets"
          value={kpis.ticketsByStatus ? 
            (kpis.ticketsByStatus['New'] || 0) + (kpis.ticketsByStatus['In Progress'] || 0) : 0}
          icon="bi-exclamation-circle"
          color="warning"
          description="New + In Progress"
        />

        <StatCard
          title="Resolved Tickets"
          value={kpis.ticketsByStatus ? kpis.ticketsByStatus['Resolved'] || 0 : 0}
          icon="bi-check-circle"
          color="success"
          description="Successfully resolved"
        />
      </div>

      {/* Charts Row */}
      <div className="row">
        <StatusCard statusData={kpis.ticketsByStatus} />
        
        <div className="col-12 col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Create New Ticket
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-people me-2"></i>
                  Manage Users
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Generate Report
                </button>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-gear me-2"></i>
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                System Overview
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <h4 className="text-primary">{kpis.totalTickets || 0}</h4>
                  <p className="text-muted mb-0">Total Tickets</p>
                </div>
                <div className="col-md-3">
                  <h4 className="text-warning">
                    {kpis.ticketsByStatus ? 
                      Object.values(kpis.ticketsByStatus).reduce((a, b) => a + b, 0) - (kpis.ticketsByStatus['Resolved'] || 0) : 0}
                  </h4>
                  <p className="text-muted mb-0">Pending</p>
                </div>
                <div className="col-md-3">
                  <h4 className="text-success">{kpis.ticketsByStatus?.['Resolved'] || 0}</h4>
                  <p className="text-muted mb-0">Resolved</p>
                </div>
                <div className="col-md-3">
                  <h4 className="text-info">
                    {kpis.averageResolutionTimeHours ? 
                      `${Math.round(kpis.averageResolutionTimeHours)}h` : 'N/A'}
                  </h4>
                  <p className="text-muted mb-0">Avg Resolution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;