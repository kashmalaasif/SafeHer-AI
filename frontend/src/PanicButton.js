import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Default location (New York) - used when geolocation is unavailable
const DEFAULT_LOCATION = "40.7128,-74.0060";

function PanicButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
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

  const sendAlert = async () => {
    setLoading(true);
    setStatus("");
    setError("");

    try {
      const location = await getLocation();
      
      const response = await axios.post(`${API_URL}/panic`, {
        location: location,
      });

      setStatus("✅ Emergency Alert Sent Successfully! Location: " + location);
      console.log("Panic response:", response.data);

    } catch (err) {
      setError("Failed to send alert. Make sure backend is running on port 8000.");
      console.error("Panic error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panic-button-container">
      <h2>🆘 Emergency Alert</h2>
      <p>Press the button below to send an immediate alert to your emergency contacts with your current location.</p>

      <button
        className={`panic-button ${loading ? "loading" : ""}`}
        onClick={sendAlert}
        disabled={loading}
      >
        {loading ? (
          <span>Sending Alert...</span>
        ) : (
          <span>🚨 PANIC ALERT</span>
        )}
      </button>

      {status && <div className="success-message">{status}</div>}
      {error && <div className="error-message">{error}</div>}

      <p className="panic-note">
        <strong>Note:</strong> Uses default location if GPS is unavailable.
      </p>
    </div>
  );
}

export default PanicButton;
