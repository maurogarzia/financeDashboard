
import { ErrorAlert } from "../utils/ErrorAlert"
import axiosInstance from "../interceptors/axiosInstance";

const URL_USERS = `/users`

export const getAllUsers = async() => {
    try {
        const users = await axiosInstance.get(URL_USERS)
        return users.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los usuarios')
    }
}

export const getUserById = async(id: string) => {
    try {
        const user = await axiosInstance.get(`${URL_USERS}/${id}`)
        return user.data
    } catch (error: any) {
        console.log(error.mesage);
        ErrorAlert('Ups!', 'No se pudo encontrar el usuario')
    }
}

export const getUserLogged = async() => {
    try {
        const user = await axiosInstance.get(`${URL_USERS}/me`)
        return user.data
    } catch (error: any) {
        console.log(error.messgae);
        ErrorAlert('Ups!', 'No se pudo obtener el usuario logueado')
    }
}

export const deleteUser = async(id : string) => {
    try {
        const deletedUser = await axiosInstance.delete(`${URL_USERS}/${id}`)
        return deletedUser.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo eliminar el usuario')
    }
}