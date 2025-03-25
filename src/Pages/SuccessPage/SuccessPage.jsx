import "./SuccessPage.css"

import { useEffect, useState } from "react";


const SuccessPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/data-extra/get-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(res => {
        setPhoneNumber(res.data.phoneNumber)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="success-page">
      <div className="sucess-page-content">
        <h1>¡Pago recibido! 🎉</h1>
        <h2>
          Tu pago ha sido procesado con éxito.
          Ahora, nuestro equipo revisará la transacción y activará tu cuenta lo antes posible.
        </h2>

        <h2>¿Qué sucede ahora?</h2>
        <ul>
          <li>Recibirás un correo de confirmación cuando tu cuenta esté activa.</li>
          <li>Este proceso puede tardar hasta 24 horas.</li>
          <li>Si tienes alguna pregunta, no dudes en contactarnos.</li>
        </ul>

        <p>
          📧 ¿Necesitas ayuda?
          Escríbenos a {phoneNumber}
        </p>
        <p>Gracias por tu paciencia y confianza. 💛</p>
      </div>
    </div>
  );
};

export default SuccessPage;
