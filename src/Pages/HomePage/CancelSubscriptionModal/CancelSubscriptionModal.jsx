import { useContext, useState } from "react";
import CustomButton from "../../../Components/CustomButton/CustomButton"
import "./CancelSubscriptionModal.css"

import { ImCross } from "react-icons/im";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";





const CancelSubscriptionModal = () => {
    const { setInCancelSubModal, inCancelSubModal, userData, setUserData } = useContext(AuthContext)
    const [alert, setAlert] = useState('')

    const navigate = useNavigate()


    const handleCancel = () => {

        fetch(`${import.meta.env.VITE_API_BASE}/api/payment/cancel`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userID: userData.userID})
        })
        .then(response => response.json())
        .then(res => {
            setUserData(res.user)
            setTimeout(() => {

               setInCancelSubModal(false)
                navigate("/auth")
            }, 1000);
        })
        .catch(err => {
            console.log(err)
            setAlert("Error al cancelar la suscripción. Intenta reiniciar la sesión de usuario o ponte en contacto con el coach.")
        })
    }

    if (!inCancelSubModal) return undefined
    return (
        <div className="cancel-sub-modal-bg">
            <div className="cancel-sub-modal">
                <div className="cancel-sub-modal-header">
                    <ImCross onClick={() => setInCancelSubModal(false)} />
                </div>
                <h1>Aviso Legal sobre la Cancelación de Suscripciones</h1>
                <p>Al cancelar su suscripción, usted acepta y comprende lo siguiente:</p>
                <ul>
                    <li><strong>Acceso al Servicio:</strong> La cancelación de su suscripción resultará en la pérdida inmediata de acceso a los servicios y contenidos proporcionados bajo dicha suscripción.</li>
                    <li><strong>Pagos Pendientes:</strong> Es su responsabilidad liquidar cualquier pago pendiente antes de la cancelación.</li>
                    <li><strong>Reembolsos:</strong> No se otorgarán reembolsos por el tiempo no utilizado de su suscripción.</li>
                    <li><strong>Renovaciones Automáticas:</strong> Al cancelar su suscripción, se detendrán todas las futuras renovaciones automáticas asociadas a ella. Asegúrese de cancelar con suficiente antelación antes de la próxima fecha de facturación para evitar cargos no deseados.</li>
                    <li><strong>Acceso a Datos:</strong> Tras la cancelación, es posible que pierda el acceso a ciertos datos o contenidos asociados a su cuenta. Le recomendamos realizar copias de seguridad de cualquier información que desee conservar antes de proceder con la cancelación.</li>
                    <li><strong>Reactivación de la Suscripción:</strong> Si decide reactivar su suscripción en el futuro, no se mantendrán las tarifas, condiciones o beneficios anteriores. La reactivación estará sujeta a los términos y condiciones vigentes en ese momento.</li>
                </ul>
                <p>Para obtener más información sobre el proceso de cancelación y sus implicaciones, le sugerimos consultar la documentación oficial de Stripe o ponerse en contacto con el coach.</p>
                <CustomButton onClick={handleCancel}>Cancelar suscripción</CustomButton>
                <p className="cancel-sub-modal-alert">{alert}</p>
            </div>
        </div>
    )
}

export default CancelSubscriptionModal