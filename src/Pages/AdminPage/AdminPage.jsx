import { useContext, useState } from "react"
import AdminAuthPanel from "./AdminAuthPanel/AdminAuthPanel"
import "./AdminPage.css"
import NewPostPanel from "./NewPostPanel/NewPostPanel"
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Contexts/AuthContext";


const AdminPage = () => {
    const { adminAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        navigate(path)
    }
    return (
        <div className="admin-page">
            {
                adminAuthenticated ?
                    <header>
                        <h1 onClick={() => handleNavigate('/admin/dashboard')}>Panel de administrador</h1>
                    </header> : undefined
            }

            <div className="admin-body">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage