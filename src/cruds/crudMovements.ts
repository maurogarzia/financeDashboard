
import { BASE_URL } from "../utils/constantes"
import { ErrorAlert } from "../utils/ErrorAlert"
import type { IMovents } from "../types/IMovents"
import axiosInstance from "../interceptors/axiosInstance"

const URL_MOVEMENTS = `${BASE_URL}/movements`

export const getAllMovements = async() => {
    try {
        const movements = await axiosInstance.get(URL_MOVEMENTS)
        return movements.data
    } catch (error : any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

export const getById = async(id: string) => {
    try {
        const movement = await axiosInstance.get(`${URL_MOVEMENTS}/${id}`)
        return movement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener el movimiento')
    }
}

export const getAncentsForUser = async(userId: string) => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/${userId}/ancents`)
        return movements.data
    } catch (error:any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

export const getRecentsForUser = async(userId: string) => {
    try {
        const movement = await axiosInstance.get(`${URL_MOVEMENTS}/${userId}/recents`)
        return movement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimeintos')
    }
}

export const createMovement = async(data: IMovents) => {
    try {
        const newMovement = await axiosInstance.post(`${URL_MOVEMENTS}`, data)
        return newMovement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo crear el movimiento')
    }
}

export const updateMovement = async(data: IMovents, id: string) =>{
    try {
        const editMovement = await axiosInstance.put(`${URL_MOVEMENTS}/${id}`, data)
        return editMovement.data
    } catch (error:any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo editar el movimiento')
    }
}

export const deleteMovement = async(id: string) => {
    try {
        const deletedMovement = await axiosInstance.delete(`${URL_MOVEMENTS},${id}`)
        return deletedMovement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo eliminar el movimeinto')
    }
}