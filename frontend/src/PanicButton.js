import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

const DEFAULT_LOCATION = "40.7128,-74.0060";

function PanicButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
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

  const sendAlert = async () => {
    setLoading(true);
    setStatus("");
    setError("");

    try {
      const location = await getLocation();
      
      const response = await axios.post(`${API_URL}/panic`, {
        location: location,
      });

      setStatus("✅ Emergency Alert Sent! Location: " + location);
      console.log("Panic response:", response.data);

    } catch (err) {
      setError("Failed to send alert. Check if backend is running.");
      console.error("Panic error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panic-button-container">
      <h2>🆘 Emergency Alert</h2>
      <p>Press the button to send an immediate alert with your location.</p>

      <button
        className={`panic-button ${loading ? "loading" : ""}`}
        onClick={sendAlert}
        disabled={loading}
      >
        {loading ? "Sending..." : "🚨 PANIC ALERT"}
      </button>

      {status && <div className="success-message">{status}</div>}
      {error && <div className="error-message">{error}</div>}

      <p className="panic-note">
        Uses default location if GPS unavailable.
      </p>
    </div>
  );
}

export default PanicButton;
