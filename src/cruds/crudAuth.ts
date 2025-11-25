
import { ErrorAlert } from "../utils/ErrorAlert";
import { BASE_URL } from "../utils/constantes";

const BASE_LOGIN = `${BASE_URL}/auth/google`

export const login = () => {
    try {
        window.location.href = BASE_LOGIN
    } catch (error : any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo iniciar sesión')
    }
}