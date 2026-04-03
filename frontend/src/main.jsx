import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import Preview from './Preview.jsx'

const isPreview = window.location.pathname === '/preview';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPreview ? (
      <Preview />
    ) : (
      <GoogleOAuthProvider clientId="1076957044730-mht8sbihb0d4661hprrvbjf9v4gb0njr.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    )}
  </StrictMode>,
)
