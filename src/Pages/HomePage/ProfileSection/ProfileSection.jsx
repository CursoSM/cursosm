import { useEffect, useState } from "react"
import "./ProfileSection.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"



const ProfileSection = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState()

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")))
    }, [])
    const handleLogOut = () => {
        localStorage.removeItem("userData")
        localStorage.removeItem("userToken")
        navigate("/auth")
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
                        <div className="profile-panel-profile-picture">
                            <p>{userData.username}</p>
                        </div>
                        <div className="profile-panel-header-info">
                        <h1>{userData.username}</h1>
                        <h2>{userData.email}</h2>
                        </div>
                        </div>
                        <div className="profile-panel-body">
                            <div className="profile-plan-display">
                                <h1 className={userData.plan == "vip" ? "fontc-rainbow" : ""}>PLAN: {userData.plan}</h1>
                            </div>
                        </div>
                        <div className="profile-panel-footer">
                            <CustomButton onClick={handleLogOut}>Cerrar sesión</CustomButton>
                        </div>
                       </div>
                    </div>
            }
        </section>
    )
}


export default ProfileSection