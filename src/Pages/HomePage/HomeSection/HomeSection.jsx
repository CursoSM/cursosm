import Post from "../Post/Post"
import "./HomeSection.css"



const HomeSection = ({posts}) => {
    return (
        <section className="home-section">
            {
                posts.map((current, index) => (
                    <Post data={current} key={index} />
                ))
            }
        </section>
    )
}


export default HomeSection