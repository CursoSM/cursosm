import { useNavigate } from "react-router-dom"
import "./AdminDashboardPanel.css"


const AdminDashboardPanel = () => {
    const navigate = useNavigate()


    const handleNavigate = (path) => {
        navigate(`/admin/${path}`)
    }


    return (
        <nav className="admin-dashboard">
            <a onClick={() => handleNavigate('new-post')}>Nuevo anuncio</a>
            <a onClick={() => handleNavigate('delete-post')}>Eliminar anuncio</a>
            <a onClick={() => handleNavigate('plan-editor')}>Editar planes</a>
            <a onClick={() => handleNavigate('users')}>Usuarios</a>
            <a onClick={() => handleNavigate('extra-data')}>Datos extra</a>
        </nav>
    )
}


export default AdminDashboardPanel