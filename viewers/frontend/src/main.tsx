import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './Portfolio'
import { PortfolioProvider } from './context/PortfolioContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  </StrictMode>,
)
