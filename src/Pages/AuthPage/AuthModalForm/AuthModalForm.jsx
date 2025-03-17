import { useNavigate } from "react-router-dom"
import CustomButton from "../../../Components/CustomButton/CustomButton"
import "./AuthModalForm.css"
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext";


const LogInForm = ({handleLogin}) => {
    return (
        <form onSubmit={handleLogin}>
        <label for="username">
            Correo electrónico
        </label>
        <input id="username" placeholder="tucorreo@gmail.com" name="username" />
        <label for="password">
            Contraseña
        </label>
        <input type="password" id="password" name="password" />
        <a className="forgot-password-a">Olvidé mi contraseña</a>
        <CustomButton className={"confirm-auth-btn"} animationType="verticalScale">
            Iniciar sesión
        </CustomButton>
    </form>
    )
}
const SignUpForm = ({handleSignUp}) => {
    return (
        <form onSubmit={handleSignUp} >
             <label for="username">
            Nombre de usuario
        </label>
        <input id="username" placeholder="Juan Pérez" name="username" />

        <label for="email">
            Correo electrónico
        </label>
        <input id="email" placeholder="tucorreo@gmail.com" name="email" />

        <label for="password">
            Contraseña
        </label>
        <input type="password" id="password" name="password" />

        <label for="password-confirm">
            Confirmar contraseña
        </label>
        <input type="password" id="password-confirm" name="password-confirm" />

        <CustomButton 
        className={"confirm-auth-btn"}
         animationType="verticalScale"
         >
            Crear cuenta
        </CustomButton>
    </form>
    )
}

const AuthModalForm = () => {
    const navigate = useNavigate()
    const { authMode, setAuthMode } = useContext(AuthContext)
    const [alert, setAlert] = useState("")

    const handleClose = () => {
        setAuthMode("none")
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(!username || !password) {
            return setAlert("Usuario y/o contraseña incompletos")
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error de autenticación:", data);
                if(data.error.message == "user dont exist") {
                    setAlert("El usuario no existe") 
                }
                else if (data.error.message == "incorrect password") {
                    setAlert("Contraseña incorrecta")
                }
                return;
            }

            console.log(data.user);
            localStorage.setItem("userToken", data.user.token)
            navigate("/")

        } catch (err) {
            console.error("Error en la solicitud:", err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;

        if(!username || !email || !password || !passwordConfirm) {
            return setAlert("Campos incompletos")
        }
        else if (password != passwordConfirm) {
            return setAlert("Las contraseñas no coinciden")
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

           console.log(data)

           if (!response.ok) {
            if(data.error.message == "user already exist") {
                return setAlert("El usuario ya existe") 
            }
            return;
        }

        } catch (err) {
            console.error("Error en la solicitud:", err);
        }
    };


    return (
        <div className="auth-modal-form-bg">
            <div className="auth-modal-form">
                <div className="auth-modal-header">
                    <h2>
                        {authMode == "log-in" ?
                            "Iniciar sesión"
                            : authMode == "sign-up" ?
                                "Registrarse"
                                : ""}
                    </h2>
                    <ImCross onClick={handleClose} />
                </div>
                {
                    authMode == "log-in" ?
                    <LogInForm handleLogin={handleLogin} />
                    : authMode == "sign-up" ?
                    <SignUpForm handleSignUp={handleSignUp} />
                    : undefined
                }

                <div className="auth-modal-footer">
                {
                    authMode == "log-in" ?
                    <a onClick={() => setAuthMode("sign-up")}>Crear cuenta</a>
                    : authMode == "sign-up" ?
                    <a onClick={() => setAuthMode("log-in")}>Iniciar sesión</a>
                    : undefined
                }
                <p>{alert}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthModalForm