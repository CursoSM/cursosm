import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AuthPage from './Pages/AuthPage/AuthPage'
import HomePage from './Pages/HomePage/HomePage'
import { useContext, useEffect } from 'react'
import { MediaViewerContext } from './Contexts/MediaViewerContext'
import MediaViewer from './Components/MediaViewer/MediaViewer'
import SuccessPage from './Pages/SuccessPage/SuccessPage'
import AdminPage from './Pages/AdminPage/AdminPage'
import NewPostPanel from './Pages/AdminPage/NewPostPanel/NewPostPanel'
import { AuthContext } from './Contexts/AuthContext'
import AdminAuthPanel from './Pages/AdminPage/AdminAuthPanel/AdminAuthPanel'
import DeletePostPanel from './Pages/AdminPage/DeletePostPanel/DeletePostPanel'
import PlanEditorPanel from './Pages/AdminPage/PlanEditorPanel/PlanEditorPanel'
import AdminDashboardPanel from './Pages/AdminPage/AdminDashboardPanel/AdminDashboardPanel'
import ExtraDataPanel from './Pages/AdminPage/ExtraDataPanel/ExtraDataPanel'
import UsersPanel from './Pages/AdminPage/UsersPanel/UsersPanel'

function App() {
  const { media } = useContext(MediaViewerContext)

  const navigate = useNavigate()
  const location = useLocation()

  const { adminAuthenticated } = useContext(AuthContext)


  useEffect(() => {
    if (!adminAuthenticated && location.pathname.startsWith('/admin')) {
      navigate('/admin/admin-auth');
    }
  }, [adminAuthenticated, location.pathname, navigate]);
  


  return (
    <div className='app dot-pattern'>
      <MediaViewer />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path='/admin' element={<AdminPage />}>
          <Route path='admin-auth' element={<AdminAuthPanel />} />
          <Route path='dashboard' element={<AdminDashboardPanel />} />
          <Route path='new-post' element={<NewPostPanel />} />
          <Route path='delete-post' element={<DeletePostPanel />} />
          <Route path='plan-editor' element={<PlanEditorPanel />} />
          <Route path='extra-data' element={<ExtraDataPanel />} />
          <Route path='users' element={<UsersPanel />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App
