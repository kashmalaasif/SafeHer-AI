import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const DEFAULT_LOCATION = "40.7128,-74.0060";

function SensorDetection() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sensorStatus, setSensorStatus] = useState("Off");
  const [alertCooldown, setAlertCooldown] = useState(false);
  const [lastAlert, setLastAlert] = useState(null);
  const [detectionCount, setDetectionCount] = useState(0);

  // Sensitivity threshold
  const SHAKE_THRESHOLD = 25;

  // Get location
  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(DEFAULT_LOCATION);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords.latitude + "," + pos.coords.longitude),
        () => resolve(DEFAULT_LOCATION),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  // Auto send alert
  const sendAutoAlert = useCallback(async (reason) => {
    if (alertCooldown) return;

    setAlertCooldown(true);
    setDetectionCount((prev) => prev + 1);
    setLastAlert(new Date().toLocaleTimeString());

    try {
      const location = await getLocation();
      await axios.post(`${API_URL}/panic`, {
        location: location,
        custom_message: `🔔 AUTO ALERT: ${reason}`,
      });

      // Browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🚨 SafeHer AI Alert Sent!", {
          body: reason,
        });
      }
    } catch (err) {
      console.error("Alert error:", err);
    }

    // 30 second cooldown
    setTimeout(() => setAlertCooldown(false), 30000);
  }, [alertCooldown]);

  // Motion detection handler
  const handleMotion = useCallback((event) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = Math.abs(acc.x || 0);
    const y = Math.abs(acc.y || 0);
    const z = Math.abs(acc.z || 0);
    const total = Math.sqrt(x * x + y * y + z * z);

    // Detect shake/fall
    if (total > SHAKE_THRESHOLD || x > SHAKE_THRESHOLD || y > SHAKE_THRESHOLD) {
      sendAutoAlert("Shake or fall detected");
    }
  }, [sendAutoAlert]);

  // Enable/disable sensors
  useEffect(() => {
    if (isEnabled) {
      if (window.DeviceMotionEvent) {
        // iOS permission
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          DeviceMotionEvent.requestPermission()
            .then((permission) => {
              if (permission === "granted") {
                window.addEventListener("devicemotion", handleMotion);
                setSensorStatus("Active");
              } else {
                setSensorStatus("Denied");
                setIsEnabled(false);
              }
            })
            .catch(() => {
              setSensorStatus("Error");
              setIsEnabled(false);
            });
        } else {
          window.addEventListener("devicemotion", handleMotion);
          setSensorStatus("Active");
        }

        // Request notification permission
        if ("Notification" in window && Notification.permission === "default") {
          Notification.requestPermission();
        }
      } else {
        setSensorStatus("Not Supported");
        setIsEnabled(false);
      }
    } else {
      window.removeEventListener("devicemotion", handleMotion);
      setSensorStatus("Off");
    }

    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isEnabled, handleMotion]);

  return (
    <div className="sensor-detection-container">
      <h2>📱 Auto Protection</h2>
      <p>Automatically sends alert when shake or fall is detected.</p>

      {/* Simple Toggle */}
      <div className="sensor-toggle">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
        <span className="toggle-label">
          {isEnabled ? "Protection ON" : "Protection OFF"}
        </span>
      </div>

      {/* Status */}
      <div className="sensor-status">
        <div className={`status-indicator ${isEnabled ? "active" : ""}`}>
          <span className="status-dot"></span>
          <span>Status: {sensorStatus}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="sensor-stats">
        <div className="stat-row">
          <span>🔔 Alerts Sent:</span>
          <strong>{detectionCount}</strong>
        </div>
        {lastAlert && (
          <div className="stat-row">
            <span>⏰ Last Alert:</span>
            <strong>{lastAlert}</strong>
          </div>
        )}
        {alertCooldown && (
          <div className="cooldown-badge">
            ⏳ Cooldown Active (30s)
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="sensor-info">
        <p>📲 <strong>On Mobile:</strong> Shake phone or fall triggers alert automatically</p>
        <p>💻 <strong>On Desktop:</strong> Use Panic Button instead</p>
      </div>
    </div>
  );
}

export default SensorDetection;
