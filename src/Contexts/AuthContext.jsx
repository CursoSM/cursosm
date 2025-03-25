import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext(null)


const AuthContextProvider = ({children}) => {
    const [adminAuthenticated, setAdminAuthenticated] = useState(false)

    const [SlideBarOpen, setSlideBarOpen] = useState(null)
    const [authMode, setAuthMode] = useState("none")

    const [currentSection, setCurrentSection] = useState(0)

    const [userData, setUserData] = useState(null)

    const [inCancelSubModal, setInCancelSubModal] = useState(false)


    const handleLogOut = () => {
        setUserData(null);
        localStorage.removeItem("userToken")
    }




    return (
        <AuthContext.Provider value={{
            SlideBarOpen, 
            setSlideBarOpen, 
            currentSection, 
            setCurrentSection,
            authMode,
            setAuthMode,
            userData,
            setUserData,
            handleLogOut,
            inCancelSubModal,
            setInCancelSubModal,
            adminAuthenticated,
            setAdminAuthenticated
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider