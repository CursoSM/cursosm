import { useEffect, useState } from "react"
import "./UsersPanel.css"
import CustomButton from "../../../Components/CustomButton/CustomButton"

const UserCard = ({data}) => {
    const [processing, setProcessing] = useState(false)

    const [plan, setPlan] = useState(data.plan)

    const handleUpdatePlan = () => {
        setProcessing(true)

        fetch(`${import.meta.env.VITE_API_BASE}/api/user/update-user-plan`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID: data.userID, newPlan: plan})
        })
            .then(response => response.json())
            .then(res => {
                setProcessing(false)
                alert('Plan Actualizado')
            })
            .catch(err => {
                console.log(err)
                setProcessing(false)
                alert('Ocurrió un error')
            })
    }

    return (
        <div className={`admin-user-card ${plan}`}>
            <div className="admin-user-card-content">
                <h2>{data.username}</h2>
                <p>{data.email}</p>
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    <option value='basic'>Básico</option>
                    <option value='standar'>Estándar</option>
                    <option value='vip'>VIP</option>
                </select>
                <CustomButton onClick={handleUpdatePlan} disable={processing} animationType="verticalScale">Guardar</CustomButton>
            </div>
        </div>
    )
}

const UsersPanel = () => {
    const [users, setUsers] = useState([])



    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/user/get-members`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(res => {
                setUsers(res)
            })
            .catch(err => console.log(err))
    }, [])
    
    
    return (
        <div className="users-panel">
            <h2>Panel de usuarios</h2>
            
            <div className="users-container">
                {
                    users.map((current, index) => (
                        <UserCard data={current} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default UsersPanel