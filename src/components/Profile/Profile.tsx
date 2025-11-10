import { useNavigate } from 'react-router'

import style from './Profile.module.css'

export const Profile = () => {

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    return (
        <div className={style.containerPrincipal}>
            
            <div className={style.arrowBack}>
                <button onClick={navigateToHome}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className={style.containerName}>
                <span className="material-symbols-outlined">account_circle</span>
                <p>Mauro Garzia</p>
                <p>(maurogarzia2@gmail.com)</p>

            </div>

            <div className={style.item}>
                <button>Cerrar Sesion</button>
            </div>
        </div>
    )
}