import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MediaViewerProvider from './Contexts/MediaViewerContext.jsx'
import AuthContextProvider from './Contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <MediaViewerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </MediaViewerProvider>
  </AuthContextProvider>
)
