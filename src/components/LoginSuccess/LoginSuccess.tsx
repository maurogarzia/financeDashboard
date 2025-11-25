import { useNavigate } from "react-router"
import { useStoreUser } from "../../store/useStoreUser"
import { useEffect } from "react"

export const LoginSuccess = () => {
    const navigate = useNavigate()
    const {setUserLogged} = useStoreUser()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        const processLogin = async () => {
            if (!token) return navigate("/login");

            localStorage.setItem("token", token);

        
            await setUserLogged();

            // Forzar re-render del AppRoutes
            window.dispatchEvent(new Event("storage"));

            navigate("/");
        }

        processLogin();
}, []);

    return (
        <div>
            <p>Iniciando sesion...</p>
        </div>
    )
}