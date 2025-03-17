import MainHeader from "../HomePage/MainHeader/MainHeader"
import CourseOverviewAuth from "./CourseOverviewAuth/CourseOverviewAuth"
import "./AuthPage.css"
import { useContext, useEffect, useState } from "react"
import AuthHeader from "./AuthHeader/AuthHeader"
import SlideBar from "../../Components/SlideBar/SlideBar"
import { AnimatePresence } from "framer-motion"
import { AuthContext } from "../../Contexts/AuthContext"
import AuthModalForm from "./AuthModalForm/AuthModalForm"
import { useNavigate } from "react-router-dom"



const AuthPage = () => {
    const navigate = useNavigate()

    const {SlideBarOpen, authMode} = useContext(AuthContext)

    useEffect(() => {
        const validateUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/validate-session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({authorization: `Bearer ${localStorage.getItem("userToken")}`})
                });

                const data = await response.json();
    
                if (!response.ok) {
                    console.error("Error de validación:", data);
                    localStorage.removeItem("userToken");
                    navigate("/auth")
                    return;
                }
        
                console.log(data);
                localStorage.setItem("userData", JSON.stringify(data.user))    

                navigate("/")
            } catch (error) {
                console.error("Error en la solicitud:", error);
                localStorage.removeItem("userToken");
                navigate("/auth")
            }
        }

        validateUser()
       
    }, [])


    return (
        <div className="auth-page">
            <AuthHeader />
            <CourseOverviewAuth />
            {
                SlideBarOpen ?
                <SlideBar />
                : authMode == "log-in" || authMode == "sign-up" ?
                <AuthModalForm /> :
                undefined
            }
        </div>
    )
}


export default AuthPage