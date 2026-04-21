import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Portfolio from './Portfolio'
import AdminSkills from './components/AdminSkills'
import './index.css'

const GOOGLE_CLIENT_ID = "297802815809-p97abbmum6f2lvvq87ohsdeji3f3pmuk.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminSkills />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>,
)
