

import { BASE_URL } from "../utils/constantes"


const URL_AUTH = `${BASE_URL}/auth/google`

export const login = async() => {
    window.location.href = `${URL_AUTH}`;
}