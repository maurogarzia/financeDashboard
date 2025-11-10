import { useNavigate } from 'react-router'
import style from './Header.module.css'

export const Header = () => {

    const navigate = useNavigate()

    const navigateToProfile = () => {
        navigate('/profile')
    }

    return (
        <div className={style.containerPrincipal}>
            <h1>Gestión de Finanzas</h1>
            <span onClick={navigateToProfile} className="material-symbols-outlined">account_circle</span>
        </div>
    )
}