import { useContext, useEffect, useState } from "react"
import Post from "../Post/Post"
import "./HomeSection.css"

import {AuthContext} from "../../../Contexts/AuthContext"

const HomeSection = ({posts}) => {
    const {userData, setUserData} = useContext(AuthContext)

    const [members, setMembers] = useState([])



    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/user/get-members`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(res => {
            setMembers(res)
        })
        .catch(err => console.log(err))
    }, [])

    if(!userData) return <p>Cargando...</p>

    return (
        <section className="home-section">
            <div className="home-section-members-holder">
                <h2>Miembros:</h2>
                {
                    members.map((current, index) => (
                       <div  className={`home-section-member ${current.plan}`} key={index}>
                         <p>
                            {current.username}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="home-section-posts-holder">
            {
                posts.map((current, index) => (
                    <Post data={current} key={index} userPlan={userData.plan} />
                ))
            }
            </div>
        </section>
    )
}


export default HomeSection