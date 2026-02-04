import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { MentorAuthProvider } from './context/MentorAuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MentorAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </MentorAuthProvider>
    </AuthProvider>
  </StrictMode>
)
