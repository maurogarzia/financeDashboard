import style from './InitSession.module.css'
import logo from '../../assets/google-icon-logo-svgrepo-com.svg'

export const InitSession = () => {
    return (
        <div className={style.containerPrincipal}>
            <h1>Iniciar Sesión</h1>
            <button className={style.googleButton}>
                <img className={style.img} src={logo} alt="" />
                Iniciar sesión con Google
            </button>
        </div>
    )
}