import { useContext, useEffect, useState } from "react"
import "./HomePage.css"
import MainHeader from "./MainHeader/MainHeader"
import Post from "./Post/Post"
import HomeSection from "./HomeSection/HomeSection"
import MediaSection from "./MediaSection/MediaSection"
import ProfileSection from "./ProfileSection/ProfileSection"
import { useNavigate } from "react-router-dom"
import MoreInfoSection from "./MoreInfoSection/MoreInfoSection"
import { AuthContext } from "../../Contexts/AuthContext"
import CancelSubscriptionModal from "./CancelSubscriptionModal/CancelSubscriptionModal"


const HomePage = () => {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [currentSection, setCurrentSection] = useState(0)

    const {userData, setUserData} = useContext(AuthContext)




    const validateUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/validate-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({authorization: `Bearer ${localStorage.getItem("userToken")}`})
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error de validación:", data);
                localStorage.removeItem("userToken");
                navigate("/auth")
                return;
            }
            
            setUserData(data.user)

            if(data.user.plan == "nonePlan") {
                navigate("/auth")
            }
            
        } catch (error) {
            console.error("Error en la solicitud:", error);
            localStorage.removeItem("userToken");
            navigate("/auth")
        }
    }

    useEffect(() => {
        validateUser()
    }, [])

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_BASE}/api/posts/get-all`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(res => {
            setPosts(res.posts)
        })
        .catch(err => {
            console.log(err)
        })
    }, [userData])

    const handleProfile = () => {
       setCurrentSection(3)
    }


    return (
        <div className="home-page">
            <CancelSubscriptionModal />
            <MainHeader onProfileClick={handleProfile} />
            <div className="home-page-body">
                <nav className="home-body-nav">
                    <ul>
                    <li className={`${currentSection == 0 ? "current-section" : ""}`}>
                        <a onClick={() => setCurrentSection(0)}>Anuncios</a>
                        </li>
                    <li className={`${currentSection == 1 ? "current-section" : ""}`}>
                        <a onClick={() => setCurrentSection(1)}>Contenido</a>
                        </li>
                    <li className={`${currentSection == 2 ? "current-section" : ""}`}>
                        <a onClick={() => setCurrentSection(2)}>Más</a>
                        </li>
                    </ul>
                </nav>
                {
                    currentSection == 0 ?
                    <HomeSection posts={posts}/> :
                    currentSection == 1 ?
                    <MediaSection posts={posts} /> :
                    currentSection == 2 ?
                    <MoreInfoSection /> :
                    <ProfileSection />
                }
            </div>
        </div>
    )
}


export default HomePage