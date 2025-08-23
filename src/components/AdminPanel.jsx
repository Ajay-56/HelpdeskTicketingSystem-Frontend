import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/admin";

const AdminPanel = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [kpis, setKpis] = useState(null);
  const [agentReports, setAgentReports] = useState({});
  const [submissionTrends, setSubmissionTrends] = useState({});
  const [workload, setWorkload] = useState({});
  const [ticketId, setTicketId] = useState("");
  const [newAgentId, setNewAgentId] = useState("");
  const [message, setMessage] = useState("");

  // Helper to fetch with JWT
  const fetchWithAuth = async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${auth?.token}` },
    });
    return res.json();
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
    const loadData = async () => {
      setKpis(await fetchWithAuth("/dashboard/kpis"));
      setAgentReports(await fetchWithAuth("/dashboard/agent-reports"));
      setSubmissionTrends(await fetchWithAuth("/dashboard/submission-trends"));
      setWorkload(await fetchWithAuth("/dashboard/agent-workload"));
    };
    loadData();
  }, [auth, navigate]);

  const handleReassign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tickets/${ticketId}/reassign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({ newAgentId }),
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error reassigning ticket.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel</h2>
        <button className="btn btn-danger" onClick={() => { logout(); navigate("/login"); }}>
          Logout
        </button>
      </div>

      {/* KPIs */}
      <div className="mb-4">
        <h4>📊 KPIs</h4>
        {kpis ? (
          <pre>{JSON.stringify(kpis, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Agent Reports */}
      <div className="mb-4">
        <h4>👨‍💼 Agent Reports</h4>
        <pre>{JSON.stringify(agentReports, null, 2)}</pre>
      </div>

      {/* Submission Trends */}
      <div className="mb-4">
        <h4>📈 Submission Trends</h4>
        <pre>{JSON.stringify(submissionTrends, null, 2)}</pre>
      </div>

      {/* Agent Workload */}
      <div className="mb-4">
        <h4>⚖️ Agent Workload</h4>
        <pre>{JSON.stringify(workload, null, 2)}</pre>
      </div>

      {/* Reassign Ticket */}
      <div className="mb-4">
        <h4>🔄 Reassign Ticket</h4>
        <form onSubmit={handleReassign} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="New Agent ID"
            value={newAgentId}
            onChange={(e) => setNewAgentId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Reassign</button>
        </form>
        {message && <p className="mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
