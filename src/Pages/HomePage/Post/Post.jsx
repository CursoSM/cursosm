import { useContext, useEffect, useState } from "react";
import "./Post.css"

import { FaRegHeart, FaHeart, FaComment, FaRegComment } from "react-icons/fa";
import { MediaViewerContext } from "../../../Contexts/MediaViewerContext";


const Post = ({ data }) => {
    const {setMedia} = useContext(MediaViewerContext)

    const [images, setImages] = useState([])
    const [audios, setAudios] = useState([])
    const [videos, setVideos] = useState([])

    useEffect(() => {
        setImages([])
        setAudios([])
        setVideos([])

        if (data.media?.length > 0) {
          data.media.forEach(current => {
            const mediaItem = current; // Obtén el elemento de media de la respuesta de Strapi
            const fileType = mediaItem.mime.split('/')[0]; // 'image', 'audio', 'video', etc.
    
            if (fileType === 'image') {
              // Renderiza una imagen
              setImages(prev => [...prev, mediaItem.url]);
            } else if (fileType === 'audio') {
              // Renderiza un reproductor de audio
              setAudios(prev => [...prev, mediaItem.url]);
            } else if (fileType === 'video') {
              // Renderiza un reproductor de video
              setVideos(prev => [...prev, mediaItem.url]);
            } else {
              // Maneja otros tipos de archivos o casos por defecto
              return null;
            }
          });
        }
      }, [data]);


    return (
        <div className="post">
            <div className="post-header">
                <div className="post-author">
                    <img src="https://ui-avatars.com/api/?name=John+Doe&size=128" alt="Foto de perfil" />
                    <h1>Nombre</h1>
                </div>
                <p className="post-date">29 / 12 / 2002</p>
            </div>
            <div className="post-body">
                <p>
                    {data.cuerpo}
                </p>
                <div className="post-body-media-container">
                    <div className="post-media-container-audios">
                        {
                            audios.map((current, index) => (
                                <audio controls src={`${import.meta.env.VITE_API}${current}`} key={index} />
                            ))
                        }
                    </div>
                    <div className="post-media-container-images">
                        {
                            images.map((current, index) => (
                                <img 
                                src={`${import.meta.env.VITE_API}${current}`} key={index} 
                                onClick={() => setMedia({type: "image", url: current})} 
                                />
                            ))
                        }
                    </div>
                    <div className="post-media-container-videos">
                        {
                            videos.map((current, index) => (
                                <video conntrols key={index}>
                                    <source 
                                    src={`${import.meta.env.VITE_API}${current}`} type="video/mp4" 
                                    onClick={() => setMedia({type: "video", url: current})} 

                                    />
                                    Tu navegador no soporta el elemento de video.
                                    </video>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <FaRegHeart />
                <p>0</p>
                <FaRegComment />
                <p>0</p>
            </div>
        </div>
    )
}


export default Post