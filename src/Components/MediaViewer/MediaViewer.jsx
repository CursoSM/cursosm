import { useContext } from "react"
import "./MediaViewer.css"
import { MediaViewerContext } from "../../Contexts/MediaViewerContext"


const MediaViewer = () => {
    const { media, setMedia } = useContext(MediaViewerContext)

    const handleClose = (e) => {
        e.stopPropagation()
        setMedia(null)
    }

    if (media == null) {
        return null;
    }
    return (
        <div className="media-viewer-bg" onClick={e => handleClose(e)}>
            <div className="media-viewer">
                {
                    media.type == "image" ? 
                    <img src={`${import.meta.env.VITE_API}${media.url}`} /> :
                    media.type == "video" ?
                        <video conntrols>
                            <source src={`${import.meta.env.VITE_API}${media.url}`} type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video> : undefined
                }
            </div>
        </div>
    )
}

export default MediaViewer