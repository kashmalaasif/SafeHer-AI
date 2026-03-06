"""
SafeHer AI - Alert System
Handles SMS alerts via Twilio and email notifications
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

# Twilio Configuration - Set these as environment variables
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "YOUR_TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "YOUR_TWILIO_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "+1234567890")
EMERGENCY_CONTACT = os.getenv("EMERGENCY_CONTACT", "+0987654321")

# Email Configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "your-email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
EMERGENCY_EMAIL = os.getenv("EMERGENCY_EMAIL", "emergency-contact@email.com")


def send_sms_alert(message: str, location: str, to_number: Optional[str] = None) -> dict:
    """
    Send SMS alert via Twilio with location information.
    
    Args:
        message: Alert message content
        location: GPS coordinates (lat,lng format)
        to_number: Optional recipient number (defaults to emergency contact)
        
    Returns:
        Dictionary with status and details
    """
    try:
        from twilio.rest import Client
        
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        body = f"""
🚨 SAFETY ALERT - SafeHer AI 🚨

{message}

📍 Location:
https://maps.google.com/?q={location}

⏰ This is an automated safety alert.
Please check on this person immediately.
        """.strip()
        
        recipient = to_number or EMERGENCY_CONTACT
        
        sms = client.messages.create(
            body=body,
            from_=TWILIO_FROM_NUMBER,
            to=recipient
        )
        
        return {
            "status": "sent",
            "sid": sms.sid,
            "to": recipient
        }
        
    except ImportError:
        print("Twilio not installed. Run: pip install twilio")
        return {"status": "error", "message": "Twilio not installed"}
        
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return {"status": "error", "message": str(e)}


def send_email_alert(message: str, location: str, to_email: Optional[str] = None) -> dict:
    """
    Send email alert with location information.
    
    Args:
        message: Alert message content
        location: GPS coordinates (lat,lng format)
        to_email: Optional recipient email (defaults to emergency email)
        
    Returns:
        Dictionary with status and details
    """
    try:
        recipient = to_email or EMERGENCY_EMAIL
        
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = recipient
        msg['Subject'] = "🚨 URGENT: SafeHer AI Safety Alert"
        
        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="background: #ff4444; color: white; padding: 15px; border-radius: 8px;">
                <h1>🚨 Safety Alert</h1>
            </div>
            
            <div style="padding: 20px; background: #f5f5f5; margin-top: 15px; border-radius: 8px;">
                <h3>Alert Details:</h3>
                <p><strong>Message:</strong> {message}</p>
                
                <h3>📍 Location:</h3>
                <p>
                    <a href="https://maps.google.com/?q={location}" 
                       style="background: #4285f4; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px;">
                        View on Google Maps
                    </a>
                </p>
                <p>Coordinates: {location}</p>
            </div>
            
            <p style="color: #888; margin-top: 20px;">
                This is an automated alert from SafeHer AI Safety System.
                Please respond immediately.
            </p>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(body, 'html'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        
        return {"status": "sent", "to": recipient}
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return {"status": "error", "message": str(e)}


def send_alert(message: str, location: str, alert_type: str = "all") -> dict:
    """
    Send alert through configured channels.
    
    Args:
        message: Alert message content
        location: GPS coordinates (lat,lng format)
        alert_type: "sms", "email", or "all"
        
    Returns:
        Dictionary with results from each channel
    """
    results = {}
    
    if alert_type in ["sms", "all"]:
        results["sms"] = send_sms_alert(message, location)
    
    if alert_type in ["email", "all"]:
        results["email"] = send_email_alert(message, location)
    
    return results
