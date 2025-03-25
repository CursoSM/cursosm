import "./MinimalistPost.css"


import { useEffect, useState } from "react";

import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaRegBookmark, FaBookmark, FaLock } from "react-icons/fa";


const MinimalistPost = ({ data }) => {
    const [formatDate, setFormatDate] = useState(null)

    const [images, setImages] = useState([])
    const [audios, setAudios] = useState([])
    const [videos, setVideos] = useState([])



    useEffect(() => {
        if (!data) return

        const date = new Date(data.createdAt);

        const newDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
        setFormatDate(newDate)


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

    }, [data])



    return (
        <div className={`minimalist-post ${data.plan}`}>
            <div className="minimalist-post-content">
                <div className="minimalist-post-header">
                    <h1>{data.author}</h1>
                    <p>{formatDate}</p>
                </div>
                 <div className="post-body">
                    <p>
                        {data.cuerpo}
                    </p>
                    <div className="minimalist-post-media-container">
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
                                    <video controls key={index}>
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
                <div className="minimalist-post-footer">
                    <FaHeart />
                </div>
            </div>
        </div>
    )
}

export default MinimalistPost