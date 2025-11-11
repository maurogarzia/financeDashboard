import { useNavigate } from 'react-router'

import style from './Profile.module.css'
import { useStoreUser } from '../../store/useStoreUser';


export const Profile = () => {

    const {userLogged} = useStoreUser()

    const navigate = useNavigate()

    
    const navigateToHome = () => {
        navigate('/')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('storage')) // Forza re-render
    }

    

    return (
        <div className={style.containerPrincipal}>
            
            <div className={style.arrowBack}>
                <button onClick={navigateToHome}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className={style.containerName}>
                <img src={userLogged?.avatar} alt="" />
                <p>{userLogged?.fullName}</p>
                <p>({userLogged?.email})</p>

            </div>

            <div className={style.item}>
                <button onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </div>
    )
}