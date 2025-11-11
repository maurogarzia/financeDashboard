import style from './InitSession.module.css'
import logo from '../../assets/google-icon-logo-svgrepo-com.svg'
import { login } from '../../cruds/crudAuth'


export const InitSession = () => {

    const handleLogin = () => {
        login()
    }
    
    return (
        <div className={style.containerPrincipal}>
            <h1>Iniciar Sesión</h1>

            <p>No hay sesión iniciada</p>
            <p>Para acceder debe iniciar sesión con google</p>

            <button className={style.googleButton} onClick={handleLogin}>
                <img className={style.img} src={logo} alt="" />
                Iniciar sesión con Google
            </button>
        </div>
    )
}