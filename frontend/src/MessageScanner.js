import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Default location (New York) - used when geolocation is unavailable
const DEFAULT_LOCATION = "40.7128,-74.0060";

function MessageScanner() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.log("Geolocation not supported, using default location");
        resolve(DEFAULT_LOCATION);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = position.coords.latitude + "," + position.coords.longitude;
          resolve(location);
        },
        (err) => {
          console.log("Geolocation error, using default location:", err);
          resolve(DEFAULT_LOCATION);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
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
      console.log("Scan response:", response.data);
    } catch (err) {
      setError("Failed to analyze message. Make sure backend is running on port 8000.");
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

  const clearForm = () => {
    setText("");
    setResult(null);
    setError("");
  };

  return (
    <div className="message-scanner-container">
      <h2>🔍 Message Scanner</h2>
      <p>Analyze messages for potential harassment or threatening content.</p>

      <div className="scanner-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type a message to analyze for threats..."
          rows={5}
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
            onClick={clearForm}
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
            <p>
              <strong>Threat Score:</strong>{" "}
              {(result.threat_score * 100).toFixed(1)}%
            </p>
            <p>
              <strong>Classification:</strong> {result.threat_label}
            </p>
            <p>
              <strong>Alert Sent:</strong> {result.alert_sent ? "Yes ✅" : "No"}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>

          {result.status === "Threat Detected" && (
            <div className="warning-box">
              <p>
                ⚠️ <strong>Warning:</strong> This message contains potentially
                harmful content. An alert has been sent to your emergency
                contacts.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageScanner;
