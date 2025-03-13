import CustomButton from "../../../Components/CustomButton/CustomButton"
import "./MainHeader.css"


const MainHeader = () => {
    return (
        <div className="main-header">
            <h1>
                Curso SM           
            </h1>
            <CustomButton className={"profile-btn"}>
                    Perfil
                </CustomButton>
        </div>
    )
}


export default MainHeader