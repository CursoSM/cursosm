import { useState, useEffect } from "react"
import CustomButton from "../../../Components/CustomButton/CustomButton"
import "./MoreInfoSection.css"


const MoreInfoSection = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [telegramLink, setTelegramLink] = useState('')
       
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/data-extra/get-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setPhoneNumber(res.data.phoneNumber)
                setTelegramLink(res.data.telegramLink)
            })
            .catch(err => console.log(err))
    }, [])

    const handleTelegramClick = () => {
        window.open(telegramLink, '_blank');
    };

    return (
        <section className="more-info-section dot-pattern">
            <h1>Más Información</h1>
            <br />
            <br />
            <h2>¿Qué es la Formación SM?</h2>
            <p>La <strong>Formación SM</strong> es un programa diseñado para ayudarte a gestionar la ansiedad, 
            el estrés y la depresión de manera efectiva. A través de herramientas prácticas y un enfoque basado en el bienestar, 
            aprenderás a recuperar el equilibrio en tu vida.</p>
            <br />
            <br />
            <h2>Soporte y Consultas</h2>
            <p>Si tienes dudas sobre la formación o necesitas asistencia personalizada, puedes comunicarte directamente con el coach.</p>
            <p><strong>Teléfono:</strong> <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
            <br />

            <CustomButton onClick={handleTelegramClick}>
            Grupo de Telegram
            </CustomButton>
        </section>
    )
}



export default MoreInfoSection