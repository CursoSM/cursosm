import "./AuthHeader.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"

import { FaGripLines } from "react-icons/fa";
import { useContext } from "react";
import { SlideBarContext } from "../../../Contexts/SlideBarContext";



const AuthHeader = ({props}) => {
    const {setIsOpen} = useContext(SlideBarContext)

    return (
        <div className="auth-header dot-pattern">
            <h1>Curso SM</h1>
            <nav className="auth-sections-nav">
                <ul>
                    <li><a 
                    className={props.currentSection == 0 ? "current" : ""} 
                    onClick={() => props.setCurrentSection(0)}>
                        Información
                        </a></li>
                        <li><a 
                    className={props.currentSection == 1 ? "current" : ""} 
                    onClick={() => props.setCurrentSection(1)}>
                        Pases
                        </a></li>
                </ul>
            </nav>
            <div className="user-data">
                <CustomButton className={"log-in"} animationType="verticalScale">
                    Iniciar sesión 
                </CustomButton>
                <CustomButton className={"sign-up"} animationType="verticalScale">
                    Registrarse
                </CustomButton>
            </div>
            <FaGripLines className="burguer-menu" onClick={() => setIsOpen(true)} />
        </div>
    )
}


export default AuthHeader