import { createContext, useState } from "react";



export const SlideBarContext = createContext(null)


const SlideBarContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(null)
    const [currentSection, setCurrentSection] = useState(0)

    return (
        <SlideBarContext.Provider value={{isOpen, setIsOpen, currentSection, setCurrentSection}}>
            {children}
        </SlideBarContext.Provider>
    )
}

export default SlideBarContextProvider