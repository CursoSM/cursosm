import "./DeletePostPanel.css"

import { useState, useEffect } from "react"
import Post from "../../HomePage/Post/Post"
import CustomButton from "../../../Components/CustomButton/CustomButton"

import { ImCross } from "react-icons/im";



const DeletePostPanel = () => {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/get-all`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setPosts(res.posts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (postID) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/posts/delete-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postID })
        })

        if (!response.ok) {
            return alert('Algo salió mal')
        }

        const updatedPosts = [...posts].filter(current => current.postID != postID)
        setPosts(updatedPosts)

    }

    return (
        <div className="delete-post-panel">
            <h2>Eliminar anuncio</h2>
            <div className="posts-holder">
                {
                    posts?.map((current, index) => (
                        <div className="post-container">
                            <a
                                className={'delete-btn'}
                                onClick={() => handleDelete(current.postID)}
                            >
                                <ImCross />
                            </a>
                            <Post key={index} userPlan={'vip'} data={current} canInteract={false} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default DeletePostPanel