import { useEffect, useState } from "react"
import "./PlanEditorPanel.css"

import PlanCard from "../../AuthPage/Plans/PlanCard/PlanCard.jsx"
import CustomButton from "../../../Components/CustomButton/CustomButton.jsx"

import { ImCross } from "react-icons/im"
import { IoSend } from "react-icons/io5";


const PlanCardData = ({ data, subID, updatePlan, processing }) => {

    const [planName, setPlanName] = useState(data.planName);
    const [planDescription, setPlanDescription] = useState(data.planDescription);
    const [planType, setPlanType] = useState(data.planType);
    const [planPrice, setPlanPrice] = useState(data.planPrice);
    const [paypalLink, setPaypalLink] = useState(data.paypalLink);
    const [benefits, setBenefits] = useState(data.planBenefits || []);
    const [newBenefit, setNewBenefit] = useState('');

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].benefitItem = value;
        setBenefits(updatedBenefits);
    };

    const handleAddBenefit = (e) => {
        e.preventDefault();
        if (newBenefit.trim() !== '') {
            setBenefits([...benefits, { benefitItem: newBenefit }]);
            setNewBenefit('');
        }
    };

    const handleRemoveBenefit = (index) => {
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    const handleUpdate = () => {
        let errors = [];

        if (!planName.trim()) errors.push('El nombre no puede ser nulo.');
        if (!planType.trim()) errors.push('El nivel del plan no puede ser nulo.');
        if (!paypalLink.trim()) errors.push('El link de pago no puede ser nulo.');

        const priceNumber = Number(planPrice);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            errors.push('Error en el precio: debe ser un número mayor a 0.');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        updatePlan(data, {
            planName,
            planDescription,
            planPrice: priceNumber,
            planBenefits: benefits,
            planType,
            paypalLink
        });
    };

    return (
        <div className="plan-container">
            <CustomButton onClick={handleUpdate} animationType="verticalScale" disable={processing}>
                Actualizar
            </CustomButton>
            <div className="plan-card-data">
                <h1>{subID}</h1>
                <label>
                    Nombre
                    <input value={planName} onChange={e => setPlanName(e.target.value)} />
                </label>
                <label>
                    Descripción
                    <textarea value={planDescription} onChange={e => setPlanDescription(e.target.value)} />
                </label>
                <label>
                    Nivel
                    <select value={planType} onChange={e => setPlanType(e.target.value)}>
                        <option value="basic">Básico</option>
                        <option value="standar">Estándar</option>
                        <option value="vip">VIP</option>
                    </select>
                </label>
                <label>
                    Beneficios
                    <ul className="plan-card-data-benefits">
                        {benefits.map((current, index) => (
                            <li key={index} className="benefit">
                                <input
                                    value={current.benefitItem}
                                    onChange={e => handleBenefitChange(index, e.target.value)}
                                />
                                <a href="#" onClick={(e) => { e.preventDefault(); handleRemoveBenefit(index); }}>
                                    <ImCross />
                                </a>
                            </li>
                        ))}
                        <li className="benefit">
                            <input
                                value={newBenefit}
                                onChange={e => setNewBenefit(e.target.value)}
                                placeholder="Agregar beneficio"
                            />
                            <a href="#" onClick={handleAddBenefit}>
                                <IoSend />
                            </a>
                        </li>
                    </ul>
                </label>
                <label>
                    Precio
                    <input
                        type="number"
                        value={planPrice}
                        onChange={e => setPlanPrice(e.target.value)}
                    />
                </label>
                <label>
                    Paypal Link
                    <input value={paypalLink} onChange={e => setPaypalLink(e.target.value)} />
                </label>
            </div>
        </div>
    );
};


const PlanEditorPanel = () => {
    const [processing, setProcessing] = useState(false)

    const [plans, setPlans] = useState([])


    useEffect(() => {
        setProcessing(true)

        fetch(`${import.meta.env.VITE_API_BASE}/api/plan/get-plans`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setPlans(res)
            })
            .catch(err => console.log(err))
        setProcessing(false)
    }, [])

    const handleEditPlan = (plan, updatedPlan) => {
        setProcessing(true)

        fetch(`${import.meta.env.VITE_API_BASE}/api/plan/edit-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ planId: plan.id, updatedPlan })
        })
            .then(response => response.json())
            .then(res => {
                const newPlans = [...plans].map(current => {
                    if (current.id == plan.id) {
                        return res.data
                    }
                    return current
                })
                setPlans(newPlans)
                setProcessing(false)
            })
            .catch(err => {
                alert('Algo salió mal')
                console.log(err)
                setProcessing(false)
            })
    }
    return (
        <div className="plan-editor-panel">
            <h2>Editor de planes</h2>

            <div className="plans-container">
                {
                    plans.map((current, index) => (
                        <PlanCardData
                            data={current}
                            subID={`Plan ${index + 1}`}
                            key={index}
                            updatePlan={handleEditPlan}
                            processing={processing}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default PlanEditorPanel