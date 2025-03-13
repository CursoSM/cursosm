import CustomButton from "../../../Components/CustomButton/CustomButton"
import useScrolling from "../../../helpers/useScrolling"
import "./MainHeader.css"


const MainHeader = () => {
    const {isScrolling} = useScrolling()


    return (
        <div className={`main-header`}>
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