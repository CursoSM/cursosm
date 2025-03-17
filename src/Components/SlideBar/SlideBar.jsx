import { useContext } from "react"
import "./SlideBar.css"

import { motion } from "framer-motion"
import { AuthContext } from "../../Contexts/AuthContext"

import { ImCross } from "react-icons/im";
import CustomButton from "../CustomButton/CustomButton";





const SlideBar = () => {
    const {SlideBarOpen, setSlideBarOpen, setCurrentSection, currentSection, setAuthMode} = useContext(AuthContext)


    const handleClick = (section) => {
        setCurrentSection(section)
        setSlideBarOpen(false)
    }

    const handleLogIn = () => {
        setAuthMode("log-in")
        setSlideBarOpen(false)
    }
    const handleSignUp = () => {
        setAuthMode("sign-up")
        setSlideBarOpen(false)
    }


    if(!SlideBarOpen) {
        return null
    }
    return (
        <motion.div
        key={1}
        className="slide-bar"
        initial={{x: "100%"}} 
        animate={{
            x: "0%"
        }}
        exit={{
            x: "100%"
        }}
        >
            <div className="slide-bar-header">
                <ImCross onClick={() => setSlideBarOpen(false)} />
            </div>
            <div className="slide-bar-body">
                <a className={currentSection == 0 ? "current" : ""} onClick={() => handleClick(0)}>Información</a>
                <a className={currentSection == 1 ? "current" : ""} onClick={() => handleClick(1)}>Pases</a>
            </div>
            <div className="slide-bar-footer">
                <button onClick={handleLogIn}>Iniciar sesión</button>
                <button onClick={handleSignUp} className="signup-button">Registrarse</button>
            </div>
        </motion.div>
    )
}


export default SlideBar