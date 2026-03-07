# ⚠️ Risk Log

Issues identified during development and how they were resolved.

---

## Risk 1: Geolocation Permission Denied

**Issue Identified:** January 2025  
**Severity:** High 🔴  
**Status:** ✅ Resolved  

### Problem
Users denying location permission caused the app to crash or hang indefinitely.

### Impact
- Panic button didn't work
- Message scanner failed
- Poor user experience

### Resolution
Implemented fallback to default location when permission is denied:

```javascript
const getLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_LOCATION); // Fallback
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords.latitude + "," + pos.coords.longitude),
      () => resolve(DEFAULT_LOCATION), // Error fallback
      { timeout: 5000 }
    );
  });
};
```

### Lesson Learned
Always provide graceful fallbacks for permission-dependent features.

---

## Risk 2: Sensor Detection Not Working on Desktop

**Issue Identified:** January 2025  
**Severity:** Medium 🟡  
**Status:** ✅ Resolved  

### Problem
DeviceMotion API only works on mobile devices; desktop users saw "Not Supported" error.

### Impact
- Confusing error for desktop testers
- Feature appeared broken

### Resolution
1. Added clear messaging that sensors are mobile-only
2. Removed manual test buttons (confusing)
3. Updated UI to explain:

```jsx
<div className="sensor-info">
  <p>📲 <strong>Mobile:</strong> Shake triggers alert</p>
  <p>💻 <strong>Desktop:</strong> Use Panic Button</p>
</div>
```

### Lesson Learned
Set clear expectations for device-specific features.

---

## Risk 3: ML Model Too Large for Serverless

**Issue Identified:** January 2025  
**Severity:** High 🔴  
**Status:** ✅ Resolved  

### Problem
toxic-bert model (~400MB) exceeded Vercel's 50MB function limit.

### Impact
- Deployment failed on Vercel
- Could not use AI detection in production

### Resolution
Created dual detection system:
- **Local:** Full toxic-bert model
- **Vercel:** Keyword-based detection

```python
# Serverless keyword detection
TOXIC_WORDS = ["kill", "die", "hate", "threat", ...]

def detect_harassment(text):
    found = [w for w in TOXIC_WORDS if w in text.lower()]
    if found:
        return {"is_threat": True, "score": min(len(found) * 0.25, 1.0)}
    return {"is_threat": False, "score": 0.1}
```

### Lesson Learned
Have fallback solutions for platform limitations.

---

## Risk 4: CORS Errors Between Frontend/Backend

**Issue Identified:** January 2025  
**Severity:** Medium 🟡  
**Status:** ✅ Resolved  

### Problem
Browser blocked API requests from localhost:3000 to localhost:8000.

### Impact
- All API calls failed
- "Network Error" in console

### Resolution
Added CORS middleware to FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Lesson Learned
Always configure CORS for API backends.

---

## Risk 5: Alert Spam from Sensitive Sensors

**Issue Identified:** January 2025  
**Severity:** Medium 🟡  
**Status:** ✅ Resolved  

### Problem
Slight phone movements triggered multiple alerts per second.

### Impact
- Alert fatigue
- API rate limiting
- Poor user experience

### Resolution
Implemented 30-second cooldown:

```javascript
const [alertCooldown, setAlertCooldown] = useState(false);

const sendAutoAlert = async () => {
  if (alertCooldown) return; // Skip if cooling down
  
  setAlertCooldown(true);
  // Send alert...
  
  setTimeout(() => setAlertCooldown(false), 30000); // 30s cooldown
};
```

### Lesson Learned
Rate limiting is essential for sensor-triggered actions.

---

## Risk 6: Environment Variables Exposed

**Issue Identified:** January 2025  
**Severity:** Critical 🔴  
**Status:** ✅ Resolved  

### Problem
Risk of accidentally committing API keys to GitHub.

### Impact
- Security breach
- Potential account hijacking
- Hackathon disqualification

### Resolution
1. Created `.env.example` with placeholder values
2. Added `.env` to `.gitignore`
3. Used environment variables:

```python
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID", "not_configured")
```

4. App works without secrets (alerts logged instead)

### Lesson Learned
Design apps to function without secrets for easy testing.

---

## Risk 7: Refresh Button Not Working

**Issue Identified:** January 2025  
**Severity:** Low 🟢  
**Status:** ✅ Resolved  

### Problem
Dashboard refresh button had no onClick handler.

### Impact
- Button appeared non-functional
- Poor user feedback

### Resolution
Added proper click handler and loading state:

```jsx
<button 
  onClick={fetchStatus}
  disabled={loading}
>
  {loading ? "⏳ Loading..." : "🔄 Refresh"}
</button>
```

### Lesson Learned
Always test all interactive elements.

---

## Open Risks (Not Yet Resolved)

### Risk 8: Cold Start Latency
**Severity:** Low 🟢  
**Status:** ⏳ Monitoring  

Vercel serverless functions have ~1s cold start delay. Acceptable for current use but may need optimization for real emergencies.

**Mitigation:** Could add warming pings or upgrade to Vercel Pro.

---

### Risk 9: No Data Persistence
**Severity:** Medium 🟡  
**Status:** 📋 Planned  

Alert history resets on Vercel cold start (no database).

**Planned Fix:** Add database (Supabase/PlanetScale) in next version.

---

## Risk Summary

| Risk | Severity | Status |
|------|----------|--------|
| Geolocation denied | 🔴 High | ✅ Resolved |
| Desktop sensors | 🟡 Medium | ✅ Resolved |
| ML model size | 🔴 High | ✅ Resolved |
| CORS errors | 🟡 Medium | ✅ Resolved |
| Alert spam | 🟡 Medium | ✅ Resolved |
| Secret exposure | 🔴 Critical | ✅ Resolved |
| Refresh button | 🟢 Low | ✅ Resolved |
| Cold start | 🟢 Low | ⏳ Monitoring |
| No persistence | 🟡 Medium | 📋 Planned |
