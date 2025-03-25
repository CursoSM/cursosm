import "./PlanCard.css"

import { useContext } from "react"
import { AuthContext } from "../../../../Contexts/AuthContext"

import { FaPaypal } from "react-icons/fa";

import CustomButton from "../../../../Components/CustomButton/CustomButton"



const PlanCard = ({ data }) => {
    const {userData} = useContext(AuthContext)

    const handleBuy = (link) => {
        window.open(link, '_blank');

    }

    return (
        <div
            className={`plan-card ${data.planType == 'vip' ? "featured" : ""}`}>
            <div className="plan-card-header">
                <h1 className="plan-card-title">{data.planName}</h1>
                <h4 className="plan-card-description">{data.planDescription}</h4>
            </div>

            <div className="plan-card-body">
                <ul >
                    {
                        data.planBenefits.map((current, index) => (
                            <li className="plan-card-benefit" key={index}>{current.benefitItem}</li>
                        ))
                    }
                </ul>
            </div>

            <div className="plan-card-footer">
                <h1 className="plan-card-price">{data.planPrice} USD</h1>

                {
                    !userData ?
                    <p style={{color: "var(--dangerous-red)"}}>*Inicia sesión antes de suscribirte</p>
                    : <CustomButton className={'get-plan-button'} onClick={() => handleBuy(data.paypalLink)}>Comprar <FaPaypal /></CustomButton> 
                    

                }
            </div>
        </div>
    )
}


export default PlanCard