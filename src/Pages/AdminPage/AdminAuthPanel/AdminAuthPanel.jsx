import "./AdminAuthPanel.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"
import { useContext, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"





const AdminAuthPanel = () => {
    const navigate = useNavigate()
    const {setAdminAuthenticated} = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [alert, setAlert] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()

        if (email != import.meta.env.VITE_ADMIN_EMAIL || password != import.meta.env.VITE_ADMIN_PASSWORD) {
            return setAlert("Credenciales inválidas")
        }

        setAdminAuthenticated(true)
        navigate('/admin/dashboard')
    }

    return (
        <form className="admin-auth-form" onSubmit={handleSubmit}>
            <h2>Iniciar sesión de administrador</h2>

            <label>correo</label>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
            />

            <label>contraña</label>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />

            <CustomButton animationType="verticalScale">Acceder</CustomButton>

            <p>{alert}</p>
        </form>
    )
}


export default AdminAuthPanel