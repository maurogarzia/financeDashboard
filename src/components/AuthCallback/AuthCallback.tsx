import { useEffect } from "react"
import { useNavigate } from "react-router"
import axiosInstance from "../../interceptors/axiosInstance"

// Este componente recibe el token desde el backend


export const AuthCallback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (token){
            localStorage.setItem('token', token) // Agrego el token
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            navigate('Home')
        }
    },[navigate])
    return (
        <p>Autenticando...</p>
    )
}