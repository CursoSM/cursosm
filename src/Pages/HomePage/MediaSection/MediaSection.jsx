import { useContext, useEffect, useState } from "react"
import "./MediaSection.css"
import { MediaViewerContext } from "../../../Contexts/MediaViewerContext"


const MediaSection = ({ posts }) => {
  const [media, setMedia] = useState([])

  const { setMedia: setViewerMedia } = useContext(MediaViewerContext)


  useEffect(() => {
    setMedia([])

    posts.map((current) => {
      if (current.media?.length > 0) {
        current.media.forEach(current => {
          const mediaItem = current; // Obtén el elemento de media de la respuesta de Strapi
          const fileType = mediaItem.mime.split('/')[0]; // 'image', 'audio', 'video', etc.

          if (fileType === 'image') {
            // Renderiza una imagen
            setMedia(prev => [...prev, { type: "image", url: mediaItem.url }]);
          } else if (fileType === 'audio') {
            // Renderiza un reproductor de audio
            setMedia(prev => [...prev, { type: "audio", url: mediaItem.url }]);
          } else if (fileType === 'video') {
            // Renderiza un reproductor de video
            setMedia(prev => [...prev, { type: "video", url: mediaItem.url }]);
          } else {
            // Maneja otros tipos de archivos o casos por defecto
            return null;
          }
        });
      }
    })
  }, [posts]);


  return (
    <section className="media-section">
      <div className="column">
        {media?.length > 0 &&
          media.filter((_, index) => index % 2 === 0).map((current, index) => (
            current.type === "image" ? (
              <img
                onClick={() => setViewerMedia(current)}
                src={`${import.meta.env.VITE_API}${current.url}`}
                alt={`Imagen ${index}`}
              />
            ) : current.type === "video" ? (
              <video controls onClick={() => setViewerMedia(current)}>
                <source
                  src={`${import.meta.env.VITE_API}${current.url}`}
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <audio src={`${import.meta.env.VITE_API}${current.url}`} controls />
            )
          ))}
      </div>
      <div className="column">
        {media?.length > 0 &&
          media.filter((_, index) => index % 2 !== 0).map((current, index) => (
            current.type === "image" ? (
              <img
                onClick={() => setViewerMedia(current)}
                src={`${import.meta.env.VITE_API}${current.url}`}
                alt={`Imagen ${index}`}
              />
            ) : current.type === "video" ? (
              <video controls onClick={() => setViewerMedia(current)}>
                <source
                  src={`${import.meta.env.VITE_API}${current.url}`}
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <audio src={`${import.meta.env.VITE_API}${current.url}`} controls />
            )
          ))}
      </div>
    </section>

  )
}


export default MediaSection