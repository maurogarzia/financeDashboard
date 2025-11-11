import { useEffect, type FC } from "react"
import { useNavigate } from "react-router"
import axiosInstance from "../../interceptors/axiosInstance"

// Este componente recibe el token desde el backend

interface IAuthCallback {
    onAuthSuccess: (token: string) => void;
}

export const AuthCallback : FC<IAuthCallback> = ({onAuthSuccess}) => {
    const navigate = useNavigate()
    

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (token){
            localStorage.setItem('token', token) // Agrego el token
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`


            onAuthSuccess(token)
            navigate('/')

        }

    },[navigate])
    return (
        <p>Autenticando...</p>
    )
}