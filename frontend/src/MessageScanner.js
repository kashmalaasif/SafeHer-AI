import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

const DEFAULT_LOCATION = "40.7128,-74.0060";

function MessageScanner() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(DEFAULT_LOCATION);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords.latitude + "," + position.coords.longitude);
        },
        () => resolve(DEFAULT_LOCATION),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };

  const scanMessage = async () => {
    if (!text.trim()) {
      setError("Please enter a message to analyze");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const location = await getLocation();

      const response = await axios.post(`${API_URL}/scan-message`, {
        message: text,
        location: location,
      });

      setResult(response.data);
    } catch (err) {
      setError("Failed to analyze. Check if backend is running.");
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Threat Detected") return "#ff4444";
    if (status === "Safe") return "#44aa44";
    return "#888888";
  };

  return (
    <div className="message-scanner-container">
      <h2>🔍 Message Scanner</h2>
      <p>Analyze messages for potential harassment or threats.</p>

      <div className="scanner-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type a message to analyze..."
          rows={4}
          disabled={loading}
        />

        <div className="button-group">
          <button
            className="scan-button"
            onClick={scanMessage}
            disabled={loading || !text.trim()}
          >
            {loading ? "Analyzing..." : "🔍 Analyze Message"}
          </button>

          <button
            className="clear-button"
            onClick={() => { setText(""); setResult(null); setError(""); }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-container">
          <h3>Analysis Result</h3>
          
          <div
            className="status-badge"
            style={{ backgroundColor: getStatusColor(result.status) }}
          >
            {result.status === "Threat Detected" ? "⚠️" : "✅"} {result.status}
          </div>

          <div className="result-details">
            <p><strong>Threat Score:</strong> {(result.threat_score * 100).toFixed(1)}%</p>
            <p><strong>Classification:</strong> {result.threat_label}</p>
            <p><strong>Alert Sent:</strong> {result.alert_sent ? "Yes ✅" : "No"}</p>
          </div>

          {result.status === "Threat Detected" && (
            <div className="warning-box">
              ⚠️ This message contains potentially harmful content.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageScanner;
