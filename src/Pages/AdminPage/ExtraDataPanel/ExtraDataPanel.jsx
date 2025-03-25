import { useEffect, useState } from "react"
import "./ExtraDataPanel.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"

const ExtraDataPanel = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [telegramLink, setTelegramLink] = useState('')
    const [processing, setProcessing] = useState(false)



    
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

    const updateData = (e) => {
        e.preventDefault()
        setProcessing(true)

        if(!telegramLink || !phoneNumber) {
            setProcessing(false)
            return alert('Los datos no pueden ser nulos')
        }

        fetch(`${import.meta.env.VITE_API_BASE}/api/data-extra/update-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, telegramLink })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setPhoneNumber(res.updatedData.phoneNumber)
                setTelegramLink(res.updatedData.telegramLink)
            })
            .catch(err => console.log(err))

            setProcessing(false)
    }


    return (
        <div className="extra-data-panel">
            <h2>Datos adicionales</h2>

            <form onSubmit={updateData}>
                <label>
                    Número de teléfono
                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </label>

                <label>
                    Link de Telegram
                    <input value={telegramLink} onChange={e => setTelegramLink(e.target.value)} />
                </label>
                <CustomButton disable={processing} animationType="verticalScale">Enviar</CustomButton>
            </form>
        </div>
    )
}

export default ExtraDataPanel