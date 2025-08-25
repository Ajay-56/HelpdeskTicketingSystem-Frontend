import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const AdminReports = () => {
  const { getAuthHeaders } = useAuth();
  const [agentReports, setAgentReports] = useState({});
  const [submissionTrends, setSubmissionTrends] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchAgentReports(),
        fetchSubmissionTrends()
      ]);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Error loading reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentReports = async () => {
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate + 'T00:00:00',
        endDate: dateRange.endDate + 'T23:59:59'
      });

      const response = await fetch(`https://helpdeskticketingsystem.onrender.com/api/admin/dashboard/agent-reports?${params}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAgentReports(data);
      }
    } catch (err) {
      console.error('Error fetching agent reports:', err);
    }
  };

  const fetchSubmissionTrends = async () => {
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate + 'T00:00:00',
        endDate: dateRange.endDate + 'T23:59:59'
      });

      const response = await fetch(`https://helpdeskticketingsystem.onrender.com/api/admin/dashboard/submission-trends?${params}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionTrends(data);
      }
    } catch (err) {
      console.error('Error fetching submission trends:', err);
    }
  };

  const exportReport = (reportType) => {
    let csvContent = '';
    let filename = '';

    if (reportType === 'agent') {
      csvContent = 'Agent Name,Resolved Tickets\n';
      Object.entries(agentReports).forEach(([agent, count]) => {
        csvContent += `${agent},${count}\n`;
      });
      filename = `agent-report-${dateRange.startDate}-${dateRange.endDate}.csv`;
    } else if (reportType === 'trends') {
      csvContent = 'Date,Submissions\n';
      Object.entries(submissionTrends).forEach(([date, count]) => {
        csvContent += `${date},${count}\n`;
      });
      filename = `submission-trends-${dateRange.startDate}-${dateRange.endDate}.csv`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTopPerformer = () => {
    if (Object.keys(agentReports).length === 0) return null;
    
    return Object.entries(agentReports).reduce((prev, current) => {
      return prev[1] > current[1] ? prev : current;
    });
  };

  const getTotalResolved = () => {
    return Object.values(agentReports).reduce((sum, count) => sum + count, 0);
  };

  const getPeakSubmissionDay = () => {
    if (Object.keys(submissionTrends).length === 0) return null;
    
    return Object.entries(submissionTrends).reduce((prev, current) => {
      return prev[1] > current[1] ? prev : current;
    });
  };

  const getTotalSubmissions = () => {
    return Object.values(submissionTrends).reduce((sum, count) => sum + count, 0);
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

  const topPerformer = getTopPerformer();
  const peakDay = getPeakSubmissionDay();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Reports & Analytics</h1>
        <button 
          className="btn btn-outline-primary"
          onClick={fetchReports}
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

      {/* Date Range Filter */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-calendar-range me-2"></i>
            Date Range Filter
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button 
                className="btn btn-primary w-100"
                onClick={fetchReports}
              >
                <i className="bi bi-search me-2"></i>
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="row mb-4">
        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-success mb-2">
                <i className="bi bi-trophy-fill fs-1"></i>
              </div>
              <h6 className="text-muted">Top Performer</h6>
              <h4 className="text-success">
                {topPerformer ? topPerformer[0] : 'N/A'}
              </h4>
              <p className="small text-muted mb-0">
                {topPerformer ? `${topPerformer[1]} resolved` : 'No data'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-primary mb-2">
                <i className="bi bi-check-circle-fill fs-1"></i>
              </div>
              <h6 className="text-muted">Total Resolved</h6>
              <h4 className="text-primary">{getTotalResolved()}</h4>
              <p className="small text-muted mb-0">Tickets resolved</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-info mb-2">
                <i className="bi bi-calendar-event fs-1"></i>
              </div>
              <h6 className="text-muted">Peak Day</h6>
              <h4 className="text-info">
                {peakDay ? new Date(peakDay[0]).toLocaleDateString() : 'N/A'}
              </h4>
              <p className="small text-muted mb-0">
                {peakDay ? `${peakDay[1]} submissions` : 'No data'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-warning mb-2">
                <i className="bi bi-graph-up fs-1"></i>
              </div>
              <h6 className="text-muted">Total Submissions</h6>
              <h4 className="text-warning">{getTotalSubmissions()}</h4>
              <p className="small text-muted mb-0">New tickets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance Report */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-person-check me-2"></i>
                Agent Performance Report
              </h5>
              <button 
                className="btn btn-sm btn-success"
                onClick={() => exportReport('agent')}
              >
                <i className="bi bi-download me-2"></i>
                Export CSV
              </button>
            </div>
            <div className="card-body">
              {Object.keys(agentReports).length > 0 ? (
                <div className="row">
                  {Object.entries(agentReports).map(([agent, count]) => {
                    const maxCount = Math.max(...Object.values(agentReports));
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    
                    return (
                      <div key={agent} className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-medium">{agent}</span>
                          <span className="badge bg-primary">{count} tickets</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar bg-success" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-bar-chart display-4 text-muted"></i>
                  <p className="text-muted mt-2">No agent performance data available for selected date range</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Trends */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-graph-up-arrow me-2"></i>
                Ticket Submission Trends
              </h5>
              <button 
                className="btn btn-sm btn-success"
                onClick={() => exportReport('trends')}
              >
                <i className="bi bi-download me-2"></i>
                Export CSV
              </button>
            </div>
            <div className="card-body">
              {Object.keys(submissionTrends).length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Submissions</th>
                        <th>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(submissionTrends)
                        .sort(([a], [b]) => new Date(a) - new Date(b))
                        .map(([date, count], index, array) => {
                          const prevCount = index > 0 ? array[index - 1][1] : count;
                          const trend = count > prevCount ? 'up' : count < prevCount ? 'down' : 'stable';
                          const trendIcon = trend === 'up' ? 'bi-trend-up text-success' : 
                                          trend === 'down' ? 'bi-trend-down text-danger' : 
                                          'bi-dash text-muted';
                          
                          return (
                            <tr key={date}>
                              <td>{new Date(date).toLocaleDateString()}</td>
                              <td>
                                <span className="badge bg-primary">{count}</span>
                              </td>
                              <td>
                                <i className={`bi ${trendIcon}`}></i>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x display-4 text-muted"></i>
                  <p className="text-muted mt-2">No submission trends data available for selected date range</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;