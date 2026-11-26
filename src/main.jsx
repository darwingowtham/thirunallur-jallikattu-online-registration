import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

// Retrieve Google OAuth Client ID from Vite environment
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

if (!GOOGLE_CLIENT_ID && import.meta.env.DEV) {
  console.warn(
    "[Google OAuth] VITE_GOOGLE_CLIENT_ID is not configured in .env. " +
    "To enable Google Sign-In, create a .env file and set your authorized Google Client ID."
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "dummy-client-id"}>
      <AuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
