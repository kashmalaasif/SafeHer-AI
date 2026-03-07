# 🛡️ SafeHer AI

**AI-Powered Women's Safety Companion**

> **Headline:** AI that detects danger before it escalates  
> **Subhead:** Real-time harassment detection, automatic alerts, and emergency response for women's safety  

![SafeHer AI](https://img.shields.io/badge/SafeHer-AI%20Safety-purple?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📋 Problem Statement

The solution is designed for women who face harassment, stalking, or feel unsafe in daily situations. Globally, about 1 in 3 women experience physical or sexual violence, and many lack instant access to help during emergencies. The system must be offline-capable, discreet, easy to use without technical knowledge, and able to send alerts within seconds. Success is achieved when a user can trigger an emergency alert with location in under 3 seconds and the AI detects over 70% of threatening messages.

---

## 🌟 What It Does

SafeHer AI is an AI-powered safety companion that:

1. **🔍 Detects Harassment** - AI analyzes messages for toxic/threatening content
2. **🚨 Panic Button** - One-tap emergency alerts with GPS location
3. **📱 Auto Protection** - Shake/fall detection triggers automatic alerts
4. **📊 Dashboard** - Real-time safety statistics and alert history

---

## 🚀 Quickstart (1-Command Setup)

### Prerequisites
- Python 3.9+
- Node.js 16+

### Quick Start

```bash
# Clone the repo
git clone https://github.com/mmoneka11/SafeHER-AI.git
cd SafeHER-AI

# Copy environment template
cp .env.example .env

# Run setup script (Windows)
setup.bat

# OR manually:
# Backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload &

# Frontend
cd frontend && npm install && npm start
```

**That's it!** Open http://localhost:3000 🎉

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │Dashboard │ │ Scanner  │ │ Sensors  │ │  Panic   │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
└───────┼────────────┼────────────┼────────────┼──────────┘
        │            │            │            │
        ▼            ▼            ▼            ▼
┌─────────────────────────────────────────────────────────┐
│                   REST API (FastAPI)                     │
│         /status    /scan-message    /panic              │
└─────────────────────────┬───────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  AI Model    │  │ Safety Agent │  │ Alert System │
│ (toxic-bert) │  │  (Decision)  │  │(Twilio/Email)│
└──────────────┘  └──────────────┘  └──────────────┘
```

### Component Overview

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React 18, Axios | User interface, sensor access |
| Backend | FastAPI, Python | API endpoints, business logic |
| AI Model | Hugging Face toxic-bert | Harassment detection |
| Alerts | Twilio, SMTP | SMS and email notifications |
| Hosting | Vercel | Serverless deployment |

---

## 🔧 Tech Stack

| Layer | Technology | Why Chosen |
|-------|------------|------------|
| **Frontend** | React 18 | Component-based, large ecosystem |
| **Styling** | CSS3 | No dependencies, fast loading |
| **Backend** | FastAPI | Async, fast, auto-documentation |
| **AI/ML** | Transformers | State-of-the-art NLP models |
| **Model** | toxic-bert | Pre-trained for toxicity detection |
| **SMS** | Twilio | Reliable, global coverage |
| **Hosting** | Vercel | Free tier, easy deployment |

---

## 📁 Project Structure

```
SafeHER-AI/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── App.js          # Main component
│   │   ├── App.css         # Styles
│   │   ├── config.js       # API configuration
│   │   ├── PanicButton.js  # Emergency button
│   │   ├── MessageScanner.js # AI text analyzer
│   │   ├── SensorDetection.js # Motion sensors
│   │   └── StatusDashboard.js # Statistics
│   └── package.json
│
├── backend/                 # Python backend (local)
│   ├── main.py             # FastAPI server
│   ├── model.py            # AI harassment detection
│   ├── goose_agent.py      # Safety decision agent
│   ├── alerts.py           # SMS/Email system
│   └── requirements.txt
│
├── api/                     # Vercel serverless
│   ├── index.py            # Serverless API
│   └── requirements.txt
│
├── docs/                    # Documentation
│   ├── DECISION_LOG.md     # Technical decisions
│   ├── RISK_LOG.md         # Issues & resolutions
│   └── EVIDENCE_LOG.md     # Sources & licenses
│
├── .env.example            # Environment template
├── vercel.json             # Deployment config
├── LICENSE                 # MIT License
└── README.md               # This file
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Optional: For SMS alerts (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890
EMERGENCY_CONTACT=+0987654321

# Optional: For Email alerts
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMERGENCY_EMAIL=emergency@email.com
```

**Note:** The app works without these - alerts are logged instead of sent.

---

## 🎯 UN Sustainable Development Goals

| SDG | Alignment |
|-----|-----------|
| **SDG 5: Gender Equality** | Directly addresses violence against women through technology |
| **SDG 3: Good Health & Well-being** | Safety contributes to mental and physical well-being |
| **SDG 11: Sustainable Cities** | Creates safer public spaces and communities |

---

## 🐛 Known Issues & Next Steps

### Known Issues
- [ ] Sensor detection requires HTTPS (works on Vercel, not localhost)
- [ ] AI model uses keyword detection in serverless (ML model too large)
- [ ] Stats reset on Vercel cold start (no database yet)

### Next Steps
- [ ] Add database for persistent storage
- [ ] Implement voice activation ("Hey SafeHer")
- [ ] Add trusted contacts management UI
- [ ] Create mobile app (React Native)
- [ ] Add multi-language support

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/scan-message` | POST | Analyze text for threats |
| `/api/panic` | POST | Trigger emergency alert |
| `/api/status` | GET | Get statistics |
| `/api/health` | GET | API health check |

---

## 🧪 Testing

```bash
# Test API locally
curl http://localhost:8000/api/health

# Test message scanning
curl -X POST http://localhost:8000/api/scan-message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "location": "40.7128,-74.0060"}'
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Attribution

### APIs & Services
- [Twilio](https://www.twilio.com/) - SMS messaging API
- [Hugging Face](https://huggingface.co/) - AI model hosting
- [Google Maps](https://maps.google.com/) - Location services

### AI Models
- [unitary/toxic-bert](https://huggingface.co/unitary/toxic-bert) - Toxicity detection model (Apache 2.0)

### Frameworks & Libraries
- [React](https://reactjs.org/) - MIT License
- [FastAPI](https://fastapi.tiangolo.com/) - MIT License
- [Axios](https://axios-http.com/) - MIT License
- [Transformers](https://huggingface.co/transformers/) - Apache 2.0

### Data Sources
- WHO Statistics on Violence Against Women
- UN Women Global Database

### Icons & Assets
- Emoji icons (Unicode standard)
- Custom CSS (original)

---

## 🆘 Emergency Resources

If you're in immediate danger, contact local emergency services:

| Country | Number | Helpline |
|---------|--------|----------|
| USA | 911 | National DV Hotline: 1-800-799-7233 |
| UK | 999 | Women's Aid: 0808-2000-247 |
| India | 100 | Women Helpline: 181 |
| EU | 112 | - |

---

---

## 👩‍💻 Team - Authors & Contributions

| Name | Role | Contributions | GitHub |
|------|------|---------------|--------|
| **Moneka Meghwar** | AI Developer | AI model integration, Backend API, Core features | [@mmoneka11](https://github.com/mmoneka11) |
| **Kashmala Saddiqui** | Security Specialist | Alert system, Sensor detection, Security review | [@kashmalaasif](https://github.com/kashmalaasif) |
| **Umaima Rizwan** | Documentation Lead | Documentation, UI/UX design, Testing | [@umaim691](https://github.com/umaim691) |

---

**Built with ❤️ for women's safety**

*SafeHer AI - Because Your Safety Matters* 🛡️
