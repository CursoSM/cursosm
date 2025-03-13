import PlanCard from "./PlanCard/PlanCard"
import "./PlansContainer.css"





const plans = [
    {
        title: "Básico",
        description: "Pase básico",
        benefits: [
            "2 Sesiones de una hora.",
            "Todo el contenido de la plataforma"
        ],
        price: 1100,
        isFeatured: false
    },
    {
        title: "Premium",
        description: "Pase premium",
        benefits: [
            "5 Sesiones de una hora.",
            "Todo el contenido de la plataforma",
            "Acceso a la comunidad de Telegram"
        ],
        price: 1900,
        isFeatured: false
    },
    {
        title: "VIP",
        description: "Pase VIP",
        benefits: [
            "10 Sesiones de una hora.",
            "Todo el contenido de la plataforma",
            "Acceso a la comunidad de Telegram",
            "3 Sesiones presenciales"
        ],
        price: 2200,
        isFeatured: true
    }
]

const PlansContainer = () => {
    return (
        <section className="plans-container">
            {
                plans.map((current, index) => (
                    <PlanCard data={current} key={index} />
                ))
            }
        </section>
    )
}


export default PlansContainer