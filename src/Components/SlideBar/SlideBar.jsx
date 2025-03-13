import { useContext } from "react"
import "./SlideBar.css"

import { motion } from "framer-motion"
import { SlideBarContext } from "../../Contexts/SlideBarContext"

import { ImCross } from "react-icons/im";
import CustomButton from "../CustomButton/CustomButton";





const SlideBar = () => {
    const {isOpen, setIsOpen, setCurrentSection, currentSection} = useContext(SlideBarContext)


    const handleClick = (section) => {
        setCurrentSection(section)
        setIsOpen(false)
    }

    if(!isOpen) {
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
                <ImCross onClick={() => setIsOpen(false)} />
            </div>
            <div className="slide-bar-body">
                <a className={currentSection == 0 ? "current" : ""} onClick={() => handleClick(0)}>Información</a>
                <a className={currentSection == 1 ? "current" : ""} onClick={() => handleClick(1)}>Pases</a>
            </div>
            <div className="slide-bar-footer">
                <button>Iniciar sesión</button>
                <button className="signup-button">Registrarse</button>
            </div>
        </motion.div>
    )
}


export default SlideBar