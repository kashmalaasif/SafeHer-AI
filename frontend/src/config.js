// API Configuration
// On Vercel: uses /api (same domain)
// Locally: uses localhost:8000

const isProduction = process.env.NODE_ENV === "production";

export const API_URL = isProduction 
  ? "/api" 
  : (process.env.REACT_APP_API_URL || "http://localhost:8000");
