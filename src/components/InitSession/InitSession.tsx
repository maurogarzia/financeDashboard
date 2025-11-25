import style from './InitSession.module.css'
import icon from '../../assets/google-icon.svg'
import { login } from '../../cruds/crudAuth'

export const InitSession = () => {

    

    const handleLogin = () => {
        login()
    }
    
    console.log("CLIENT ID FRONT:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
    return (
        <div className={style.containerPrincipal}>
            <h1>Iniciar Sesión</h1>

            <p>No hay sesión iniciada</p>
            <p>Para acceder debe iniciar sesión con Google</p>


            
            <button onClick={handleLogin} className={style.googleButton}>
                <img className={style.img} src={icon} alt="" />
                <p>
                    Inicio de Sesión con Google
                </p>
            </button>
            
                
            
            
        </div>
    )
}