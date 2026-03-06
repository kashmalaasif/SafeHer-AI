"""
SafeHer AI - Goose Safety Agent
AI-powered decision-making agent for women's safety
"""

from model import detect_harassment, get_threat_score
from alerts import send_alert
from datetime import datetime
from typing import Optional


class SafetyAgent:
    """
    Goose AI Agent for women's safety.
    Analyzes messages for threats and triggers alerts when needed.
    """
    
    def __init__(self):
        self.alert_history = []
        self.scan_history = []
    
    def analyze_message(self, text: str, location: str, 
                       user_id: Optional[str] = None) -> dict:
        """
        Analyze a message for potential threats and take action.
        
        Args:
            text: Message text to analyze
            location: User's GPS coordinates
            user_id: Optional user identifier
            
        Returns:
            Analysis result with status and details
        """
        timestamp = datetime.now().isoformat()
        
        # Get detailed threat analysis
        threat_analysis = get_threat_score(text)
        
        # Check if harassment detected
        is_threat = threat_analysis["is_threat"]
        
        result = {
            "timestamp": timestamp,
            "status": "Threat Detected" if is_threat else "Safe",
            "threat_score": threat_analysis["score"],
            "threat_label": threat_analysis["label"],
            "location": location,
            "alert_sent": False
        }
        
        # Send alert if threat detected
        if is_threat:
            alert_message = f"⚠️ Threat detected in message analysis.\n\nSuspicious content identified with {threat_analysis['score']*100:.1f}% confidence."
            alert_result = send_alert(alert_message, location)
            result["alert_sent"] = True
            result["alert_result"] = alert_result
            
            # Log to alert history
            self.alert_history.append({
                "timestamp": timestamp,
                "type": "harassment_detection",
                "location": location,
                "threat_score": threat_analysis["score"]
            })
        
        # Log to scan history
        self.scan_history.append({
            "timestamp": timestamp,
            "result": result["status"],
            "score": threat_analysis["score"]
        })
        
        return result
    
    def trigger_panic(self, location: str, user_id: Optional[str] = None,
                     custom_message: Optional[str] = None) -> dict:
        """
        Handle panic button activation.
        
        Args:
            location: User's GPS coordinates
            user_id: Optional user identifier
            custom_message: Optional custom message to include
            
        Returns:
            Result of panic alert
        """
        timestamp = datetime.now().isoformat()
        
        message = custom_message or "🆘 PANIC BUTTON ACTIVATED!\n\nImmediate assistance required!"
        
        alert_result = send_alert(message, location)
        
        # Log to alert history
        self.alert_history.append({
            "timestamp": timestamp,
            "type": "panic_button",
            "location": location,
            "user_id": user_id
        })
        
        return {
            "status": "Alert Sent",
            "timestamp": timestamp,
            "location": location,
            "alert_result": alert_result
        }
    
    def get_safety_status(self) -> dict:
        """
        Get overall safety status and statistics.
        
        Returns:
            Safety statistics and recent activity
        """
        total_scans = len(self.scan_history)
        threats_detected = sum(1 for s in self.scan_history if s["result"] == "Threat Detected")
        total_alerts = len(self.alert_history)
        
        return {
            "total_scans": total_scans,
            "threats_detected": threats_detected,
            "total_alerts": total_alerts,
            "recent_scans": self.scan_history[-5:] if self.scan_history else [],
            "recent_alerts": self.alert_history[-5:] if self.alert_history else []
        }
    
    def analyze_sensor_data(self, sensor_type: str, value: float, 
                           location: str, threshold: Optional[float] = None) -> dict:
        """
        Analyze sensor data for anomalies (e.g., accelerometer for fall detection).
        
        Args:
            sensor_type: Type of sensor ("accelerometer", "heart_rate", etc.)
            value: Sensor reading value
            location: User's GPS coordinates
            threshold: Optional custom threshold for alerts
            
        Returns:
            Analysis result with status
        """
        timestamp = datetime.now().isoformat()
        
        # Default thresholds for different sensors
        default_thresholds = {
            "accelerometer": 15.0,  # Sudden acceleration/fall
            "heart_rate": 120.0,    # Elevated heart rate
            "sound_level": 90.0     # Loud noise/scream
        }
        
        alert_threshold = threshold or default_thresholds.get(sensor_type, 50.0)
        is_anomaly = value > alert_threshold
        
        result = {
            "timestamp": timestamp,
            "sensor_type": sensor_type,
            "value": value,
            "threshold": alert_threshold,
            "status": "Anomaly Detected" if is_anomaly else "Normal",
            "alert_sent": False
        }
        
        if is_anomaly:
            alert_message = f"🔔 Sensor Alert!\n\n{sensor_type.title()} reading: {value}\nThreshold exceeded: {alert_threshold}"
            alert_result = send_alert(alert_message, location)
            result["alert_sent"] = True
            result["alert_result"] = alert_result
            
            self.alert_history.append({
                "timestamp": timestamp,
                "type": f"sensor_{sensor_type}",
                "location": location,
                "value": value
            })
        
        return result
