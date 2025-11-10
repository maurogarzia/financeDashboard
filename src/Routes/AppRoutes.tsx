import { Route, Routes } from "react-router"
import { MainScreen } from "../Screens/MainScreen/MainScreen"
import { SummaryScreen } from "../Screens/SummaryScreen/SummaryScreeen"
import { AuthCallback } from "../components/AuthCallback/AuthCallback"
import { ScreenProfile } from "../Screens/ScreenProfile/ScreenProfile"


export const AppRoutes = () => {
    return (
        <>
            <Routes>
                {/* Screen principal */}
                <Route path={'/'} element={<MainScreen/>}/>

                {/* Perfil */}
                <Route path={'/profile'} element={<ScreenProfile/>}/>

                {/* Resumenes por meses */}
                <Route path={'/summaryMovements'} element={<SummaryScreen/>}/>

                {/* Ruta de redireccion para token  */}
                <Route path={'auth/callback'} element={<AuthCallback/>}/>
            </Routes>
        </>
    )
}