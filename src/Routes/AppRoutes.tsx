import { Navigate, Route, Routes } from "react-router"
import { MainScreen } from "../Screens/MainScreen/MainScreen"
import { SummaryScreen } from "../Screens/SummaryScreen/SummaryScreeen"
import { ScreenProfile } from "../Screens/ScreenProfile/ScreenProfile"
import { InitSession } from "../components/InitSession/InitSession"
import { useEffect, useState } from "react"
import { useStoreUser } from "../store/useStoreUser"


export const AppRoutes = () => {

    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const {setUserLogged} = useStoreUser()

    useEffect(() => {
        if (token) setUserLogged()
    }, [token])

    useEffect(() => {
        const handleStorageChange = () => { 

            setToken(localStorage.getItem('token')) // Busca el token en el localstorage si es que lo hay

        }
        window.addEventListener('storage', handleStorageChange) // Escucha el evento storage a ver si hubo un cambio
        return () => window.removeEventListener('storage', handleStorageChange) // Limpia el evento para no escuchar cuando ya esta logueado
    },[])

    return (
        <Routes>
            {token 
            ? 
            <>
                {/* Screen principal */}
                <Route path={'/'} element={<MainScreen/>}/>

                {/* Perfil */}
                <Route path={'/profile'} element={<ScreenProfile/>}/>

                {/* Resumenes por meses */}
                <Route path={'/summaryMovements'} element={<SummaryScreen/>}/>


                {/* Si intenta ir al login lo mando al home */}
                <Route path={'/login'} element={<Navigate to="/"/>}/>
            </>
            
            : 
            
            <>
                {/* Login */}
                <Route path={'/login'} element={<InitSession/>}/>

                {/* Si intenta ir a otra ruta lo mando al login */}
                <Route path="*" element={<Navigate to={'/login'}/>}/>
            </>}
            
        </Routes>
    )
}