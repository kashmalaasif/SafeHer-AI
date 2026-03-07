import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";

function StatusDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/status`);
      setStatus(response.data);
      setError("");
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Cannot connect to backend");
      console.error("Status error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-dashboard">
      <div className="dashboard-header">
        <h2>📊 Safety Dashboard</h2>
        <button 
          className="refresh-button" 
          onClick={fetchStatus}
          disabled={loading}
        >
          {loading ? "⏳ Loading..." : "🔄 Refresh"}
        </button>
      </div>

      {error && (
        <div className="dashboard-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>🔍</h3>
          <p className="stat-number">{status?.total_scans || 0}</p>
          <p className="stat-label">Total Scans</p>
        </div>

        <div className="stat-card warning">
          <h3>⚠️</h3>
          <p className="stat-number">{status?.threats_detected || 0}</p>
          <p className="stat-label">Threats Found</p>
        </div>

        <div className="stat-card alert">
          <h3>🚨</h3>
          <p className="stat-number">{status?.total_alerts || 0}</p>
          <p className="stat-label">Alerts Sent</p>
        </div>
      </div>

      {lastRefresh && (
        <p className="last-refresh">Last updated: {lastRefresh}</p>
      )}
    </div>
  );
}

export default StatusDashboard;
