import { useContext, useEffect, useState } from "react";
import "./Post.css"

import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaRegBookmark, FaBookmark, FaLock } from "react-icons/fa";

import { MediaViewerContext } from "../../../Contexts/MediaViewerContext";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { AuthContext } from "../../../Contexts/AuthContext";

import { motion } from "framer-motion";

const CommentItem = ({ data }) => {
    return (
        <div className="comment-item" >
            <h1>{data.username}</h1>
            <p>{data.body}</p>
        </div>
    )
}

const Post = ({ data: initialData, userPlan, useAllWidth = false, canInteract = true }) => {
    const [data, setData] = useState(undefined)

    const { userData, setUserData } = useContext(AuthContext)
    const { setMedia } = useContext(MediaViewerContext)

    const [images, setImages] = useState([])
    const [audios, setAudios] = useState([])
    const [videos, setVideos] = useState([])
    const [formatDate, setFormatDate] = useState(null)

    const [commentForm, setCommentForm] = useState(false)
    const [commentValue, setCommentValue] = useState('')

    useEffect(() => {
        setData(initialData)
    }, [initialData])


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
    }, [data]);


    const handleComment = (e) => {
        e.preventDefault();



        if (!commentValue || !userData || !data || !canInteract) return
        setCommentValue('')

        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postID: data.id,
                comment: {
                    userID: userData.userID,
                    body: commentValue,
                    username: userData.username
                }
            })
        })
            .then(response => response.json())
            .then(res => {
                setData(res.updatedPost)
            })
            .catch(err => console.log(err))

    }
    const handleLike = () => {

        if (!userData || !data || !canInteract) return

        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postID: data.id,
                userID: userData.userID
            })
        })
            .then(response => response.json())
            .then(res => {
                setData(res.updatedPost)
            })
            .catch(err => console.log(err))
    }

    const handleSavePost = () => {
        if (!userData || !data || !canInteract) return

        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/save-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postID: data.postID,
                userID: userData.userID
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setUserData(res)
            })
            .catch(err => console.log(err))
    }

    if (!data || !userPlan) {
        return (
            <div className="post">
                <p>Cargando...</p>
            </div>
        )
    }

  

    return (
        <div
            className={`post ${data.plan == "vip" ? "vip" : data.plan == "estandar" ? "standar" : ""} ${useAllWidth ? "all-width" : ""}`}
        >
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
                        <h1>{data.author}</h1>
                    </div>
                    <p className="post-date">{formatDate}</p>
                </div>
                <div className="post-header responsive">
                    <div>
                        <h1>{data.author}</h1>
                        <p className="post-date">{formatDate}</p>
                    </div>
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
                <div className="post-footer">
                    <div>
                        {
                            data.likes.filter(current => current.userID == userData?.userID).length > 0 ?
                                <FaHeart onClick={handleLike} />
                                : <FaRegHeart onClick={handleLike} />
                        }
                        <p>{data.likes.length}</p>
                        <FaRegComment onClick={() => setCommentForm(!commentForm)} />
                        <p>{data.comments.length}</p>
                    </div>
                    {
                        userData?.saved_posts?.filter(current => current.postID == data.postID).length > 0 ?
                            <FaBookmark onClick={handleSavePost} /> :
                            <FaRegBookmark onClick={handleSavePost} />
                    }
                </div>
                {
                    commentForm ?
                        <>
                            {
                                data.comments.length > 0 ?
                                    <div className="comments-holder">
                                        <h2 className="comments-holder-title">Comentarios:</h2>
                                        {
                                            data.comments.map((current, index) => (
                                                <CommentItem data={current} key={index} />
                                            ))
                                        }
                                    </div> : undefined
                            }
                            <form className="comment-form" onSubmit={handleComment}>
                                <input
                                    value={commentValue}
                                    onChange={e => setCommentValue(e.target.value)}
                                    placeholder="Tu comentario aquí..."
                                />
                                <CustomButton>Enviar</CustomButton>
                            </form>
                        </>
                        : undefined
                }
            </div>
        </div>
    )
}


export default Post