import React from "react";
import PanicButton from "./PanicButton";
import MessageScanner from "./MessageScanner";
import StatusDashboard from "./StatusDashboard";
import SensorDetection from "./SensorDetection";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🛡️ SafeHer AI</h1>
        <p>AI-Powered Women's Safety Companion</p>
      </header>

      <main className="app-main">
        <div className="dashboard-section">
          <StatusDashboard />
        </div>

        <div className="scanner-section">
          <MessageScanner />
        </div>

        <div className="sensor-section">
          <SensorDetection />
        </div>

        <div className="panic-section">
          <PanicButton />
        </div>
      </main>

      <footer className="app-footer">
        <p>SafeHer AI - Keeping you safe with AI technology</p>
      </footer>
    </div>
  );
}

export default App;
