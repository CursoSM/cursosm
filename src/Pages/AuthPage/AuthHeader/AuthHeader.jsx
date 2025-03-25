import "./AuthHeader.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"

import { FaGripLines } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";



const AuthHeader = () => {
    const { setAuthMode, setSlideBarOpen, userData, handleLogOut } = useContext(AuthContext)

    const handleLogIn = () => {
        setAuthMode("log-in")
        setSlideBarOpen(false)
    }
    const handleSignUp = () => {
        setAuthMode("sign-up")
        setSlideBarOpen(false)
    }

    return (
        <div className="auth-header ">
            <h1>Formación SM</h1>

            {
                userData == null ?
                    <>
                        <div className="auth-form">
                            <CustomButton onClick={handleLogIn}>Iniciar sesión</CustomButton>
                            <CustomButton onClick={handleSignUp} className="sign-up">Registrarse</CustomButton>
                        </div>
                        <FaGripLines
                            className="burger-menu"
                            onClick={() => setSlideBarOpen(true)}
                        />
                    </>
                    : 
                    <div className="user-data">
                        <h2>{userData.username}</h2>
                        <CustomButton onClick={handleLogOut}>Cerrar sesión</CustomButton>
                        </div>
            }
        </div>
    )
}


export default AuthHeader