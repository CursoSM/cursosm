import { useContext, useEffect, useState } from "react"
import "./MediaSection.css"
import { MediaViewerContext } from "../../../Contexts/MediaViewerContext"

import { FaLock } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthContext";

const MediaItem = ({mediaData, setViewerMedia, index}) => {
  return (
    <div className={`content-holder ${mediaData.locked}`}>
    <div className="content">
    {
      mediaData.locked != "" ?
        <div className={`locked-overlay ${mediaData.locked}`}>
          <p><FaLock /> Contenido solo para miembros <b style={{ textTransform: "uppercase" }}>{mediaData.locked}</b> <FaLock /> </p>
        </div>
        : undefined
    }
    {
      mediaData.type === "image" ? (
        <img
          onClick={() => setViewerMedia(mediaData)}
          src={`${import.meta.env.VITE_API_BASE}${mediaData.url}`}
          alt={`Imagen ${index}`}
        />
      ) : mediaData.type === "video" ? (
        <video controls onClick={() => setViewerMedia(mediaData)}>
          <source
            src={`${import.meta.env.VITE_API_BASE}${mediaData.url}`}
            type="video/mp4"
          />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <audio src={`${import.meta.env.VITE_API_BASE}${mediaData.url}`} controls />
      )
    }
    </div>
  </div>
  )
}

const MediaSection = ({ posts }) => {
  const {userData} = useContext(AuthContext)
  const [media, setMedia] = useState([])

  const { setMedia: setViewerMedia } = useContext(MediaViewerContext)


  useEffect(() => {
    setMedia([])

    const userPlan = userData.plan

    posts.map((current_) => {
      if (current_.media?.length > 0) {
        current_.media.forEach(current => {
          const mediaItem = current; // Obtén el elemento de media de la respuesta de Strapi
          const fileType = mediaItem.mime.split('/')[0]; // 'image', 'audio', 'video', etc.

          let isLocked = ""

          switch (current_.plan) {
            case "estandar":
              isLocked = (userPlan == "basic" || userPlan == "nonePlan") ? "standar" : ""
              break;
            case "vip":
              isLocked = userPlan != "vip" ? "vip" : ""
              break;
          }

          if (fileType === 'image') {
            // Renderiza una imagen
            setMedia(prev => [...prev, { type: "image", url: mediaItem.url, locked: isLocked }]);
          } else if (fileType === 'audio') {
            // Renderiza un reproductor de audio
            setMedia(prev => [...prev, { type: "audio", url: mediaItem.url, locked: isLocked }]);
          } else if (fileType === 'video') {
            // Renderiza un reproductor de video
            setMedia(prev => [...prev, { type: "video", url: mediaItem.url, locked: isLocked }]);
          } else {
            // Maneja otros tipos de archivos o casos por defecto
            return null;
          }
        });
      }
    })
  }, [posts]);

  useEffect(() => {
    console.log(media)
  }, [media])


  return (
    <section className="media-section">
      <div className="column">
        {media?.length > 0 &&
          media.filter((_, index) => index % 2 === 0).map((current, index) => (
            <MediaItem mediaData={current} setViewerMedia={setViewerMedia} key={index} index={index} />
          ))}
      </div>
      <div className="column">
        {media?.length > 0 &&
          media.filter((_, index) => index % 2 !== 0).map((current, index) => (
            <MediaItem mediaData={current} setViewerMedia={setViewerMedia} key={index} index={index} />
          ))}
      </div>
      <div className="column responsive">
        {
          media?.length > 0 ?
            media.map((current, index) => (
              <MediaItem mediaData={current} setViewerMedia={setViewerMedia} key={index} index={index} />
            )) : undefined
        }
      </div>
    </section>

  )
}


export default MediaSection