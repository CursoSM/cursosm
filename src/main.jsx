import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MediaViewerProvider from './Contexts/MediaViewerContext.jsx'
import SlideBarContextProvider from './Contexts/SlideBarContext.jsx'

createRoot(document.getElementById('root')).render(
  <SlideBarContextProvider>
    <MediaViewerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </MediaViewerProvider>
  </SlideBarContextProvider>
)
