import { createContext, useState } from "react";



export const MediaViewerContext = createContext(null)


const MediaViewerProvider = ({children}) => {
    const [media, setMedia] = useState(null)
    return (
        <MediaViewerContext.Provider value={{media, setMedia}}>
            {children}
        </MediaViewerContext.Provider>
    )
}

export default MediaViewerProvider