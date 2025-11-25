import { useNavigate } from 'react-router'

import style from './Profile.module.css'
import { useStoreUser } from '../../store/useStoreUser';
import { useEffect, useState } from 'react';


export const Profile = () => {

    const {userLogged} = useStoreUser()

    const navigate = useNavigate()

    
    const navigateToHome = () => {
        navigate('/')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user-storage')
        window.dispatchEvent(new Event('storage')) // Forza re-render
    }
    
    const [avatar, setAvatar] = useState<string>('')
    useEffect(() => {
        if (userLogged?.avatar) setAvatar(userLogged?.avatar)
    },[]) 

    console.log(avatar);
    

    return (
        <div className={style.containerPrincipal}>
            
            <div className={style.arrowBack}>
                <button onClick={navigateToHome}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className={style.containerName}>
                <img src={avatar}  referrerPolicy="no-referrer"/>
                <p>{userLogged?.fullName}</p>
                <p>({userLogged?.email})</p>

            </div>

            <div className={style.item}>
                <button onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </div>
    )
}