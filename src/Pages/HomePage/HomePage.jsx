import { useEffect, useState } from "react"
import "./HomePage.css"
import MainHeader from "./MainHeader/MainHeader"
import Post from "./Post/Post"
import HomeSection from "./HomeSection/HomeSection"
import MediaSection from "./MediaSection/MediaSection"


const HomePage = () => {
    const [posts, setPosts] = useState([])
    const [currentSection, setCurrentSection] = useState(0)


    useEffect(() => {
        async function getPosts() {
            fetch(import.meta.env.VITE_API_POSTS_GET)
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data.data);
                    console.log(data.data)
                })
        }

        getPosts()
    }, [])


    return (
        <div className="home-page">
            <MainHeader />
            <div className="home-page-body">
                <nav className="home-body-nav">
                    <ul>
                    <li className={`${currentSection == 0 ? "current-section" : ""}`}>
                        <a onClick={() => setCurrentSection(0)}>Inicio</a>
                        </li>
                    <li className={`${currentSection == 1 ? "current-section" : ""}`}>
                        <a onClick={() => setCurrentSection(1)}>Media</a>
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
                    undefined
                }
            </div>
        </div>
    )
}


export default HomePage