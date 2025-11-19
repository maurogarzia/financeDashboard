import style from './InitSession.module.css'

import axiosInstance from '../../interceptors/axiosInstance'
import { GoogleLogin } from '@react-oauth/google'
import { ErrorAlert } from '../../utils/ErrorAlert'
import { useStoreUser } from '../../store/useStoreUser'



export const InitSession = () => {

    const {setUserLogged} = useStoreUser()
    
    return (
        <div className={style.containerPrincipal}>
            <h1>Iniciar Sesión</h1>

            <p>No hay sesión iniciada</p>
            <p>Para acceder debe iniciar sesión con google</p>

            <GoogleLogin
                onSuccess={async ({ credential }) => {
                    try {
                        
                        const res = await axiosInstance.post("/auth/google", {
                            token: credential
                        });
    
                        localStorage.setItem("token", res.data.token);
                        
                        await setUserLogged()
                        // Redirigir si quieres
                        window.location.href = "/";
                    } catch (error: any) {
                        console.log(error.message);
                        ErrorAlert('No se pudo iniciar sesión')
                    }
                }}
                
            />
        </div>
    )
}