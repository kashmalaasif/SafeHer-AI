"""
SafeHer AI - Backend API Server
FastAPI server for women's safety AI companion
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from goose_agent import SafetyAgent

# Initialize FastAPI app
app = FastAPI(
    title="SafeHer AI",
    description="AI-Powered Women's Safety Companion API",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Safety Agent
agent = SafetyAgent()


# Request Models
class MessageScanRequest(BaseModel):
    message: str
    location: str
    user_id: Optional[str] = None


class PanicRequest(BaseModel):
    location: str
    user_id: Optional[str] = None
    custom_message: Optional[str] = None


class SensorDataRequest(BaseModel):
    sensor_type: str
    value: float
    location: str
    threshold: Optional[float] = None


# API Endpoints
@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "service": "SafeHer AI",
        "message": "Women's Safety AI Companion is running"
    }


@app.post("/scan-message")
def scan_message(data: MessageScanRequest):
    """
    Scan a message for harassment/threats.
    
    Returns threat analysis and sends alert if threat detected.
    """
    if not data.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    if not data.location:
        raise HTTPException(status_code=400, detail="Location is required")
    
    result = agent.analyze_message(
        text=data.message,
        location=data.location,
        user_id=data.user_id
    )
    
    return result


@app.post("/panic")
def panic_alert(data: PanicRequest):
    """
    Trigger panic button alert.
    
    Sends immediate emergency alerts to configured contacts.
    """
    if not data.location:
        raise HTTPException(status_code=400, detail="Location is required")
    
    result = agent.trigger_panic(
        location=data.location,
        user_id=data.user_id,
        custom_message=data.custom_message
    )
    
    return result


@app.post("/sensor-data")
def analyze_sensor(data: SensorDataRequest):
    """
    Analyze sensor data for anomalies.
    
    Supports accelerometer, heart rate, and sound level sensors.
    """
    if not data.location:
        raise HTTPException(status_code=400, detail="Location is required")
    
    result = agent.analyze_sensor_data(
        sensor_type=data.sensor_type,
        value=data.value,
        location=data.location,
        threshold=data.threshold
    )
    
    return result


@app.get("/status")
def get_status():
    """
    Get safety system status and statistics.
    """
    return agent.get_safety_status()


@app.get("/health")
def health_check():
    """
    API health check endpoint.
    """
    return {"status": "healthy", "service": "SafeHer AI API"}


# Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
