import CustomButton from "../../../Components/CustomButton/CustomButton"
import useScrolling from "../../../helpers/useScrolling"
import "./MainHeader.css"

import { FaUser } from "react-icons/fa";

const MainHeader = ({onProfileClick}) => {
    const {isScrolling} = useScrolling()


    return (
        <div className={`main-header dot-pattern`}>
            <h1>
                Formación SM           
            </h1>
            <CustomButton className={"profile-btn"} onClick={onProfileClick}>
                    Perfil
                </CustomButton>
                <div className="profile-svg" onClick={onProfileClick}>
                <FaUser />
                </div>
        </div>
    )
}


export default MainHeader