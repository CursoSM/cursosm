import { createContext, useState } from "react";



export const AuthContext = createContext(null)


const AuthContextProvider = ({children}) => {
    const [SlideBarOpen, setSlideBarOpen] = useState(null)
    const [authMode, setAuthMode] = useState("none")

    const [currentSection, setCurrentSection] = useState(0)
    
    return (
        <AuthContext.Provider value={{
            SlideBarOpen, 
            setSlideBarOpen, 
            currentSection, 
            setCurrentSection,
            authMode,
            setAuthMode
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider