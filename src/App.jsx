import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './Pages/AuthPage/AuthPage'
import HomePage from './Pages/HomePage/HomePage'
import { useContext } from 'react'
import { MediaViewerContext } from './Contexts/MediaViewerContext'
import MediaViewer from './Components/MediaViewer/MediaViewer'

function App() {
  const {media} = useContext(MediaViewerContext)
  return (
    <div className='app dot-pattern'>
      <MediaViewer />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>


    </div>
  )
}

export default App
