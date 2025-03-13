import MainHeader from "../HomePage/MainHeader/MainHeader"
import CourseOverviewAuth from "../CourseOverviewAuth/CourseOverviewAuth"
import "./AuthPage.css"
import PlansContainer from "./Plans/PlansContainer"
import { useContext, useState } from "react"
import AuthHeader from "./AuthHeader/AuthHeader"
import SlideBar from "../../Components/SlideBar/SlideBar"
import { AnimatePresence } from "framer-motion"
import { SlideBarContext } from "../../Contexts/SlideBarContext"



const AuthPage = () => {
    const {currentSection, setCurrentSection} = useContext(SlideBarContext)
    return (
        <div className="auth-page">
        <AnimatePresence mode="popLayout">
        <SlideBar key={0} />
            </AnimatePresence>
            <AuthHeader props={{ currentSection, setCurrentSection }} />
            {
                currentSection == 0 ?
                    <CourseOverviewAuth /> :
                    currentSection == 1 ?
                        <PlansContainer /> :
                        undefined
            }
        </div>
    )
}


export default AuthPage