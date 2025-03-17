import { useContext, useEffect, useState } from "react";
import "./Post.css"

import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaRegBookmark, FaBookmark, FaLock } from "react-icons/fa";

import { MediaViewerContext } from "../../../Contexts/MediaViewerContext";


const Post = ({ data, userPlan }) => {
    const { setMedia } = useContext(MediaViewerContext)

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
        <div className={`post ${data.plan == "vip" ? "vip" : data.plan == "estandar" ? "standar" : ""}`}>
            {
                data.plan == "vip" && userPlan != "vip" ?
                    <div className="post-locked-alert">
                        <p><FaLock /> Contenido solo para miembros VIP <FaLock /> </p>
                    </div>
                    : data.plan == "estandar" && (userPlan == "nonePlan" || userPlan == "basic") ?
                        <div className="post-locked-alert">
                            <p><FaLock /> Contenido solo para miembros ESTÁNDAR <FaLock /> </p>
                        </div> :
                        undefined
            }
            <div className="post-content">
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
                                    <audio controls src={`${import.meta.env.VITE_API_BASE}${current}`} key={index} />
                                ))
                            }
                        </div>
                        <div className="post-media-container-images">
                            {
                                images.map((current, index) => (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE}${current}`} key={index}
                                        onClick={() => setMedia({ type: "image", url: current })}
                                    />
                                ))
                            }
                        </div>
                        <div className="post-media-container-videos">
                            {
                                videos.map((current, index) => (
                                    <video conntrols key={index}>
                                        <source
                                            src={`${import.meta.env.VITE_API_BASE}${current}`} type="video/mp4"
                                            onClick={() => setMedia({ type: "video", url: current })}

                                        />
                                        Tu navegador no soporta el elemento de video.
                                    </video>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="post-footer">
                    <div>
                        <FaRegHeart />
                        <p>0</p>
                        <FaRegComment />
                        <p>0</p>
                    </div>
                    <FaRegBookmark />
                </div>
            </div>
        </div>
    )
}


export default Post