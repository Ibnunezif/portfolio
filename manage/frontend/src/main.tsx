import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminAbout from './components/AdminAbout'
import AdminProjects from './components/AdminProjects'
import AdminCV from './components/AdminCV'
import AdminExperience from './components/AdminExperience'
import AdminEducation from './components/AdminEducation'
import AdminTestimonials from './components/AdminTestimonials'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/about" />} />
        <Route path="/admin" element={<Navigate to="/admin/about" />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/cv" element={<AdminCV />} />
        <Route path="/admin/experience" element={<AdminExperience />} />
        <Route path="/admin/education" element={<AdminEducation />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
      </Routes>
    </Router>
  </StrictMode>,
)
