import { useEffect, useState } from "react"
import Post from "../Post/Post"
import "./HomeSection.css"



const HomeSection = ({posts}) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setUserData( JSON.parse(localStorage.getItem("userData")))
    }, [])


    if(!userData) return <p>Cargando...</p>

    return (
        <section className="home-section">
            {
                posts.map((current, index) => (
                    <Post data={current} key={index} userPlan={userData.plan} />
                ))
            }
        </section>
    )
}


export default HomeSection