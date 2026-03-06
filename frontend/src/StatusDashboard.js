import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function StatusDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/status`);
      setStatus(response.data);
      setError("");
    } catch (err) {
      setError("Unable to fetch status");
      console.error("Status fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="status-dashboard">
        <h2>📊 Safety Dashboard</h2>
        <p>Loading status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-dashboard">
        <h2>📊 Safety Dashboard</h2>
        <p className="error-message">{error}</p>
        <button onClick={fetchStatus}>Retry</button>
      </div>
    );
  }

  return (
    <div className="status-dashboard">
      <h2>📊 Safety Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>🔍</h3>
          <p className="stat-number">{status?.total_scans || 0}</p>
          <p className="stat-label">Total Scans</p>
        </div>

        <div className="stat-card warning">
          <h3>⚠️</h3>
          <p className="stat-number">{status?.threats_detected || 0}</p>
          <p className="stat-label">Threats Detected</p>
        </div>

        <div className="stat-card alert">
          <h3>🚨</h3>
          <p className="stat-number">{status?.total_alerts || 0}</p>
          <p className="stat-label">Alerts Sent</p>
        </div>
      </div>

      {status?.recent_alerts && status.recent_alerts.length > 0 && (
        <div className="recent-activity">
          <h3>Recent Alerts</h3>
          <ul>
            {status.recent_alerts.map((alert, index) => (
              <li key={index}>
                <span className="alert-type">{alert.type}</span>
                <span className="alert-time">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="refresh-button" onClick={fetchStatus}>
        🔄 Refresh Status
      </button>
    </div>
  );
}

export default StatusDashboard;
