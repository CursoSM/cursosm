import CustomButton from "../../../../Components/CustomButton/CustomButton"
import "./PlanCard.css"


const PlanCard = ({ data }) => {
    return (
        <div className={`plan-card ${data.isFeatured ? "featured" : "" }`}>
           <div className="plan-card-header">
           <h1 className="plan-card-title">{data.title}</h1>
           <h4 className="plan-card-description">{data.description}</h4>
           </div>

           <div className="plan-card-body">
           <ul >
                {
                    data.benefits.map((current, index) => (
                        <li className="plan-card-benefit" key={index}>{current}</li>
                    ))
                }
            </ul>
           </div>

            <div className="plan-card-footer">
            <h1 className="plan-card-price">${data.price}</h1>
            <CustomButton animationType="verticalScale" className={"get-plan-button"}>
                Adquirir
            </CustomButton>
            </div>
        </div>
    )
}


export default PlanCard