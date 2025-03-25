import { useNavigate } from "react-router-dom"
import CustomButton from "../../../Components/CustomButton/CustomButton"
import "./AuthModalForm.css"
import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext";


const ChangePasswordForm = ({ setAlert, setSuccessfullyAlert, closeModal }) => {
    const [phase, setPhase] = useState(0)
    const [processing, setProcessing] = useState(false)

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [cNewPassword, setCNewPassword] = useState('')

    const handleGetCode = async (e) => {
        e.preventDefault()

        setProcessing(true)

        setAlert('')

        if (!email) {
            setAlert('¡No te olvides de ingresar el email!')
            setProcessing(false)
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/get-pass-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destination: email })
            })

            if (!response.ok) {
                const errorData = await response.json();
                setProcessing(false)
                throw new Error(errorData.error?.message || 'Something went wrong');
            }

            setPhase(1)
        } catch (error) {
            if (error.message == 'User not found') {
                setAlert("¡No existe un usuario para este email!")
            }
            console.error('Error:', error.message);

        }
        setProcessing(false)
    }

    async function handleSendCode(e) {
        e.preventDefault()

        setAlert('')
        setProcessing(true)

        const code = document.getElementById("code").value;

        if (!code) {
            setAlert('¡No te olvides de ingresar el código, te lo enviamos al email!')
            setProcessing(false)
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/confirm-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recovery_code: code,
                    email: email,
                }),
            });

            if (!response.ok) {
                // Si la respuesta no es 2xx, lanzamos un error basado en el código de estado
                const errorData = await response.json();

                setAlert('Hubo un error al confirmar el código')

                setProcessing(false)
                throw new Error(errorData.message || 'Hubo un error al confirmar el código');
            }

            setProcessing(false)
            setPhase(2)
            return
        } catch (error) {
            // Manejamos los diferentes tipos de error
            if (error.message.includes('User not found')) {
                setAlert('Usuario no encontrado')
                console.error('Usuario no encontrado');
            } else if (error.message.includes('Invalid recovery code')) {
                console.error('Código de recuperación inválido');
                setAlert('El código de recuperación es incorrecto.');
            } else if (error.message.includes('Invalid token')) {
                console.error('Token inválido');
                setAlert('El código de recuperación ha expirado o es inválido.');
            } else {
                // Error general
                console.error('Error al confirmar el código:', error.message);
                setAlert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
            }
        }
        setProcessing(false)
    }

    const changePassword = async (e) => {
        e.preventDefault()
        setAlert('')
        setProcessing(true)

        try {
            if (!newPassword || !cNewPassword || !email) {
                return alert("Por favor complete todos los campos")
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                    passwordConfirmation: cNewPassword,
                    email
                })
            })

            if (!response.ok) {
                setProcessing(false)
                return alert("Hubo un error, intentelo más tarde")
            }

            setSuccessfullyAlert('Contraseña cambiada correctamente')
            setTimeout(() => {
                setProcessing(false)
                closeModal()
            }, 2000);

        } catch (error) {
            console.log(error)
            setProcessing(false)
            return alert("Hubo un error, intentelo más tarde")
        }

        setProcessing(false)
    }



    if (phase == 0) {
        return (
            <form onSubmit={handleGetCode}>
                <label for="email">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    placeholder="tucorreo@gmail.com"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <CustomButton disable={processing} animationType="verticalScale">Enviar código</CustomButton>
            </form>
        )
    }
    else if (phase == 1) {
        return (
            <form onSubmit={handleSendCode}>
                <p style={{ opacity: .5 }}>¡Te enviamos un código de recuperación a tu email!</p>
                <label for="code">
                    Ingresa el código
                </label>
                <input id="code" placeholder="código de recuperación" name="code" />
                <CustomButton disable={processing} animationType="verticalScale">Confirmar</CustomButton>
            </form>
        )
    }
    else if (phase == 2) {
        return (
            <form onSubmit={changePassword}>
                <p style={{ opacity: .5 }}>Establece tu nueva contraseña.</p>
                <label for="password">
                    Nueva contrasela
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />

                <label for="confirm-password">
                    Confirmar nueva contraseña
                </label>
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={cNewPassword}
                    onChange={e => setCNewPassword(e.target.value)}
                />
                <CustomButton disable={processing} animationType="verticalScale">Confirmar</CustomButton>
            </form>
        )
    }
}
const LogInForm = ({ handleLogin, processing }) => {
    const { setAuthMode } = useContext(AuthContext)

    const handleForgotPassword = () => {
        setAuthMode("forgot-password")
    }
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
            <a className="forgot-password-a" onClick={handleForgotPassword}>Olvidé mi contraseña</a>
            <CustomButton className={`confirm-auth-btn`} disable={processing} animationType="verticalScale">
                Iniciar sesión
            </CustomButton>
        </form>
    )
}
const SignUpForm = ({ handleSignUp, processing }) => {
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
                className={`confirm-auth-btn`}
                disable={processing}
                animationType="verticalScale"
            >
                Crear cuenta
            </CustomButton>
        </form>
    )
}

const AuthModalForm = () => {
    const navigate = useNavigate()
    const { authMode, setAuthMode, setUserData, userData } = useContext(AuthContext)

    const [alert, setAlert] = useState("")
    const [successfullyAlert, setSuccessfullyAlert] = useState('')
    const [processing, setProcessing] = useState(false)

    const handleClose = () => {
        setAuthMode("none")
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setProcessing(true)

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            setAlert("Usuario y/o contraseña incompletos")
            setProcessing(false)
            return
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

            setProcessing(false)

            if (!response.ok) {
                console.error("Error de autenticación:", data);
                if (data.error.message == "user dont exist") {
                    setAlert("El usuario no existe")
                }
                else if (data.error.message == "incorrect password") {
                    setAlert("Contraseña incorrecta")
                }
                return;
            }

            console.log(data.user);
            localStorage.setItem("userToken", data.user.token)
            if (data.user.plan != "nonePlan") {
                navigate("/")
            }

            setUserData(data.user)
            handleClose()

        } catch (err) {
            setProcessing(false)
            console.error("Error en la solicitud:", err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        setProcessing(true)

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("password-confirm").value;

        if (!username || !email || !password || !passwordConfirm) {
            setProcessing(false)
            setAlert("Campos incompletos")
            return
        }
        else if (password != passwordConfirm) {
            setProcessing(false)
            setAlert("Las contraseñas no coinciden")
            return
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

            setProcessing(false)

            if (!response.ok) {
                if (data.error.message == "user already exist") {
                    return setAlert("El usuario ya existe")
                }
            }

            setUserData(data.userData)
            localStorage.setItem("userToken", data.userData.token)
            handleClose()

        } catch (err) {
            console.error("Error en la solicitud:", err);
        }
    };

    useEffect(() => {
        setSuccessfullyAlert('')
    }, [alert])
    useEffect(() => {
        setAlert('')
    }, [successfullyAlert])


    return (
        <div className="auth-modal-form-bg">
            <div className="auth-modal-form">
                <div className="auth-modal-header">
                    <h2>
                        {authMode == "log-in" ?
                            "Iniciar sesión"
                            : authMode == "sign-up" ?
                                "Registrarse"
                                : authMode == "forgot-password" ?
                                    "Restablecer contraseña" : undefined}
                    </h2>
                    <ImCross onClick={handleClose} />
                </div>
                {
                    authMode == "log-in" ?
                        <LogInForm handleLogin={handleLogin} processing={processing} />
                        : authMode == "sign-up" ?
                            <SignUpForm handleSignUp={handleSignUp} processing={processing} />
                            : authMode == "forgot-password" ?
                                <ChangePasswordForm
                                    processing={processing}
                                    setAlert={setAlert}
                                    setSuccessfullyAlert={setSuccessfullyAlert}
                                    closeModal={handleClose}
                                />
                                : undefined
                }

                <div className="auth-modal-footer">
                    {
                        authMode == "log-in" ?
                            <a onClick={() => setAuthMode("sign-up")}>Crear cuenta</a>
                            : authMode == "sign-up" ?
                                <a onClick={() => setAuthMode("log-in")}>Iniciar sesión</a>
                                : authMode == "forgot-password" ?
                                    <div className="forgot-password-footer">
                                        <a onClick={() => setAuthMode("sign-up")}>Crear cuenta</a>
                                        <a onClick={() => setAuthMode("log-in")}>Iniciar sesión</a>

                                    </div>
                                    : undefined
                    }
                    <p>{alert}</p>
                    <p style={{ color: "green" }}>{successfullyAlert}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthModalForm