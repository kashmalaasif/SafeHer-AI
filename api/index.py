"""
SafeHer AI - Vercel Serverless API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import os

# Initialize FastAPI
app = FastAPI(title="SafeHer AI API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
scan_history = []
alert_history = []


# Request Models
class MessageScanRequest(BaseModel):
    message: str
    location: str
    user_id: Optional[str] = None


class PanicRequest(BaseModel):
    location: str
    user_id: Optional[str] = None
    custom_message: Optional[str] = None


# Toxic keywords for detection
TOXIC_WORDS = [
    "kill", "die", "hate", "threat", "hurt", "attack", "abuse",
    "violent", "murder", "assault", "harass", "stalk", "rape",
    "beat", "punch", "slap", "destroy", "suffer", "pain", "fear",
    "danger", "harm", "blood", "revenge", "shoot", "knife", "gun"
]


def detect_harassment(text: str) -> dict:
    """Keyword-based detection for serverless."""
    text_lower = text.lower()
    found_words = [word for word in TOXIC_WORDS if word in text_lower]
    
    if found_words:
        score = min(len(found_words) * 0.3, 1.0)
        return {
            "is_threat": score > 0.5,
            "score": score,
            "label": "toxic" if score > 0.5 else "suspicious"
        }
    
    return {"is_threat": False, "score": 0.1, "label": "safe"}


def send_alert(message: str, location: str) -> dict:
    """Log alert (add Twilio here for real SMS)."""
    alert = {
        "timestamp": datetime.now().isoformat(),
        "message": message,
        "location": location,
        "map_url": f"https://maps.google.com/?q={location}"
    }
    alert_history.append(alert)
    return {"status": "logged", "alert": alert}


# Routes
@app.get("/")
@app.get("/api")
@app.get("/api/")
def root():
    return {
        "status": "active",
        "service": "SafeHer AI",
        "message": "Women's Safety API running on Vercel 🛡️"
    }


@app.get("/api/health")
def health():
    return {"status": "healthy"}


@app.post("/api/scan-message")
def scan_message(data: MessageScanRequest):
    """Scan message for threats."""
    if not data.message:
        raise HTTPException(status_code=400, detail="Message required")
    
    timestamp = datetime.now().isoformat()
    analysis = detect_harassment(data.message)
    
    result = {
        "timestamp": timestamp,
        "status": "Threat Detected" if analysis["is_threat"] else "Safe",
        "threat_score": analysis["score"],
        "threat_label": analysis["label"],
        "location": data.location,
        "alert_sent": False
    }
    
    if analysis["is_threat"]:
        send_alert(f"Threat detected: {analysis['label']}", data.location)
        result["alert_sent"] = True
    
    scan_history.append({"timestamp": timestamp, "result": result["status"]})
    
    return result


@app.post("/api/panic")
def panic_alert(data: PanicRequest):
    """Trigger panic alert."""
    if not data.location:
        raise HTTPException(status_code=400, detail="Location required")
    
    message = data.custom_message or "🆘 PANIC BUTTON ACTIVATED!"
    alert_result = send_alert(message, data.location)
    
    return {
        "status": "Alert Sent",
        "timestamp": datetime.now().isoformat(),
        "location": data.location,
        "map_url": f"https://maps.google.com/?q={data.location}",
        "alert_result": alert_result
    }


@app.get("/api/status")
def get_status():
    """Get safety statistics."""
    threats = sum(1 for s in scan_history if s.get("result") == "Threat Detected")
    
    return {
        "total_scans": len(scan_history),
        "threats_detected": threats,
        "total_alerts": len(alert_history),
        "recent_alerts": alert_history[-5:] if alert_history else []
    }


# Vercel handler
from mangum import Mangum
handler = Mangum(app)
