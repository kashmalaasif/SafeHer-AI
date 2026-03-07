// API Configuration
// Production (Vercel): uses /api (same domain)
// Development: uses localhost:8000

const API_URL = process.env.NODE_ENV === "production" 
  ? "/api" 
  : "http://localhost:8000/api";

export { API_URL };
