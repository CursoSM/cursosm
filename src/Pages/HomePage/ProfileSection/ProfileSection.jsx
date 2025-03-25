import "./ProfileSection.css"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoSend } from "react-icons/io5";

import { AuthContext } from "../../../Contexts/AuthContext"

import CustomButton from "../../../Components/CustomButton/CustomButton"
import Post from "../Post/Post"



const ProfileSection = () => {
    const navigate = useNavigate()
    const {userData, setUserData, setInCancelSubModal} = useContext(AuthContext)

    const [savedPosts, setSavedPosts] = useState([])

    const [editUsername, setEditUsername] = useState(false)
    const [newUsername, setNewUsername] = useState('')

    const handleLogOut = () => {
        setUserData(null)
        localStorage.removeItem("userToken")
        navigate("/auth")
    }

    useEffect(() => {
        if(!userData) return

        setNewUsername(userData.username)

        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/get-saved-posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userID: userData.userID})
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setSavedPosts(res)
        })
        .catch(err => console.log(err))
    }, [])


    const handleNewUsername = () => {

        if(newUsername == userData.username) {
            return setEditUsername(false)
        }
        
        if(!newUsername || !userData) {
            setEditUsername(false)
            return alert('Algo salió mal')
        }

        fetch(`${import.meta.env.VITE_API_BASE}/api/user/edit-username`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newUsername, userID: userData.userID})
        })
        .then(response => response.json())
        .then(res => {
            setUserData(res)
            setEditUsername(false)
        })
        .catch(err => {
            console.log(err)
            setEditUsername(false)
            setNewUsername(userData.username)
            return alert('Algo salió mal')
        })
    }

    return (
        <section className="profile-section">
            {
                userData == null ?
                    <div >
                        <p>Cargando...</p>
                    </div> :
                    <div className={`profile-panel ${userData.plan == "vip" ? "vip-profile" : ""}`}>
                       <div className="profile-panel-content">
                       <div className="profile-panel-header">
                        <div className="profile-panel-header-info">
                        {
                            !editUsername ?
                            <h1>{userData.username} <FaPen onClick={() => setEditUsername(true)} /></h1> 
                            : 
                            <div className="new-alias-form">
                            <input value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                            <a><ImCross onClick={() => setEditUsername(false)} /></a>
                            <a><IoSend onClick={handleNewUsername} /></a>
                            </div>
                        }
                        <h2>{userData.email}</h2>
                        </div>
                        </div>
                        <div className="profile-panel-body">
                            <div className="profile-plan-display">
                                <h1 className={userData.plan == "vip" ? "fontc-rainbow" : ""}>PLAN: {userData.plan}</h1>
                            </div>
                        </div>
                        <div className="profile-panel-footer">
                            <a onClick={() => setInCancelSubModal(true)}>cancelar suscripción</a>
                            <CustomButton onClick={handleLogOut}>Cerrar sesión</CustomButton>
                        </div>
                       </div>
                    </div>
            }
            <div className="saved-posts-holder">
                <h2 className="saved-posts-title">Anuncios guardados:</h2>
                {
                    savedPosts.map((current, index) => (
                        <Post data={current} key={index} useAllWidth={true} userPlan={userData.plan} />
                    ))
                }
            </div>
        </section>
    )
}


export default ProfileSection