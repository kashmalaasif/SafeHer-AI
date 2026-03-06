# 🛡️ SafeHer AI

**AI-Powered Women's Safety Companion**

SafeHer AI is a comprehensive safety application that uses artificial intelligence to detect harassment, provide emergency alerts, and keep women safe.

![SafeHer AI](https://img.shields.io/badge/SafeHer-AI%20Safety-purple?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green?style=flat-square)

---

## 🌟 Features

- **🔍 Harassment Detection**: AI-powered text analysis using toxic-bert model
- **🚨 Panic Button**: One-tap emergency alert system
- **📍 Location Sharing**: Automatic GPS location in alerts
- **📱 SMS Alerts**: Instant SMS notifications via Twilio
- **📧 Email Alerts**: Detailed email notifications
- **📊 Dashboard**: Real-time safety statistics
- **🔔 Sensor Detection**: Support for accelerometer/fall detection

---

## 🏗️ Architecture

```
Frontend (React)
      |
      | API Requests
      v
Backend (FastAPI)
      |
      | Goose AI Agent
      v
ML Model (toxic-bert)
      |
      v
Alert System (Twilio SMS + Email)
```

---

## 📁 Project Structure

```
safeher-ai/
│
├── backend/
│   ├── main.py           # FastAPI server
│   ├── goose_agent.py    # AI safety agent
│   ├── model.py          # ML harassment detection
│   └── alerts.py         # SMS/Email alert system
│
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   ├── PanicButton.js    # Emergency button
│   │   ├── MessageScanner.js # Text analyzer
│   │   ├── StatusDashboard.js# Statistics dashboard
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
│
├── requirements.txt      # Python dependencies
└── README.md
```

---

## 🚀 Local Setup (Windows CMD)

### Prerequisites

- Python 3.9+ ✅
- Node.js 16+ ✅

### Step 1: Backend Setup

Open CMD and run:

```cmd
cd C:\Users\hp\safeher-ai
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
py -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: **http://localhost:8000**

### Step 2: Frontend Setup

Open a **NEW CMD** window and run:

```cmd
cd C:\Users\hp\safeher-ai\frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🌐 FREE HOSTING OPTIONS

### Option 1: Render (Recommended - Easiest)

**Host Backend (Free):**

1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `safeher-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**

**Host Frontend (Free):**

1. Click **New** → **Static Site**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `safeher-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://safeher-api.onrender.com`
5. Click **Create Static Site**

---

### Option 2: Vercel + Railway

**Frontend on Vercel (Free):**

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Set **Root Directory**: `frontend`
5. Add Environment Variable:
   - `REACT_APP_API_URL` = your backend URL
6. Click **Deploy**

**Backend on Railway (Free $5 credit):**

1. Go to [railway.app](https://railway.app) and sign up
2. Click **New Project** → **Deploy from GitHub**
3. Select your repo
4. Set **Root Directory**: `backend`
5. Add **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy!

---

### Option 3: PythonAnywhere (Backend Only - Free)

1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up for free account
3. Go to **Web** tab → **Add new web app**
4. Choose **Flask** (works with FastAPI too)
5. Upload your backend files
6. Configure WSGI file for FastAPI

---

### Option 4: GitHub Pages + Render

**Frontend on GitHub Pages (Free):**

1. Build frontend: `npm run build`
2. Push `build` folder to `gh-pages` branch
3. Enable GitHub Pages in repo settings

**Backend on Render** (same as Option 1)

---

## 📦 Deploying to GitHub (Required for Hosting)

First, push your code to GitHub:

```cmd
cd C:\Users\hp\safeher-ai
git init
git add .
git commit -m "SafeHer AI - Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/safeher-ai.git
git push -u origin main
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/scan-message` | POST | Analyze text for threats |
| `/panic` | POST | Trigger panic alert |
| `/sensor-data` | POST | Analyze sensor data |
| `/status` | GET | Get system statistics |
| `/health` | GET | API health check |
| `/docs` | GET | Interactive API docs |

### Example API Calls

**Scan Message:**
```bash
curl -X POST https://your-api.onrender.com/scan-message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello there", "location": "40.7128,-74.0060"}'
```

**Panic Alert:**
```bash
curl -X POST https://your-api.onrender.com/panic \
  -H "Content-Type: application/json" \
  -d '{"location": "40.7128,-74.0060"}'
```

---

## ⚙️ Environment Variables

Create `.env` file in `backend/` folder:

```env
# Twilio (SMS Alerts)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=+1234567890
EMERGENCY_CONTACT=+0987654321

# Email (Email Alerts)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMERGENCY_EMAIL=emergency@email.com
```

---

## 🧠 AI Model

SafeHer AI uses the **unitary/toxic-bert** model from Hugging Face:

- Detects toxic language
- Identifies threats & insults
- 70%+ confidence threshold for alerts

---

## 📱 Screenshots

| Dashboard | Panic Button | Message Scanner |
|-----------|--------------|-----------------|
| 📊 Stats  | 🚨 Emergency | 🔍 AI Analysis  |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Axios, CSS3 |
| Backend | Python, FastAPI, Uvicorn |
| AI/ML | Transformers, PyTorch, toxic-bert |
| Alerts | Twilio SMS, SMTP Email |
| Hosting | Render / Vercel / Railway |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open Pull Request

---

## 📄 License

MIT License - Free to use and modify

---

## 🆘 Emergency Resources

If you're in immediate danger, contact local emergency services:

| Country | Emergency Number |
|---------|------------------|
| USA | 911 |
| UK | 999 |
| India | 100 (Police), 181 (Women Helpline) |
| EU | 112 |

---

## 👩‍💻 Author

Built with ❤️ for women's safety

---

**SafeHer AI - Because Your Safety Matters** 🛡️
