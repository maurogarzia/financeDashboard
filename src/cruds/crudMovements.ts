
import { BASE_URL } from "../utils/constantes"
import { ErrorAlert } from "../utils/ErrorAlert"
import type { IMovements } from "../types/IMovements"
import axiosInstance from "../interceptors/axiosInstance"

const URL_MOVEMENTS = `${BASE_URL}/movements`

// Todos los movimientos
export const getAllMovements = async() => {
    try {
        const movements = await axiosInstance.get(URL_MOVEMENTS)
        return movements.data
    } catch (error : any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Movimiento por id
export const getById = async(id: string) => {
    try {
        const movement = await axiosInstance.get(`${URL_MOVEMENTS}/${id}`)
        return movement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener el movimiento')
    }
}

// Todos los movimientos del usuario
export const getAllMovementsForUsers = async() => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/me`)
        return movements.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Movimientos del mes del usuario
export const getMovementsOfMonth = async() => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/me/ofTheMonth`)
        return movements.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Movimientos mas antiguos del usuario
export const getAncientsForUser = async() => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/ancents`)
        return movements.data
    } catch (error:any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Movimientos mas recientes del usuario
export const getRecentsForUser = async() => {
    try {
        const movement = await axiosInstance.get(`${URL_MOVEMENTS}/recents`)
        return movement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimeintos')
    }
}

// movimientos del usuario por typo (egreso o ingreso)
export const getByTypeForUser = async( type: 'expense' | 'income') => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/type/${type}`)
        return movements.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Movimientos de un mes y año especifico del usuario
export const getByDate = async(year: number, month: number) => {
    try {
        const movements = await axiosInstance.get(`${URL_MOVEMENTS}/me/year/${year}/month/${month}`)
        return movements.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo obtener los movimientos')
    }
}

// Crear movimiento
export const createMovement = async(data: IMovements) => {
    try {
        const newMovement = await axiosInstance.post(`${URL_MOVEMENTS}`, data)
        return newMovement.data 
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo crear el movimiento')
    }
}

// actualizar movimiento
export const updateMovement = async(data: IMovements, id: string) =>{
    try {
        const editMovement = await axiosInstance.put(`${URL_MOVEMENTS}/${id}`, data)
        return editMovement.data
    } catch (error:any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo editar el movimiento')
    }
}

// eliminar movimiento
export const deleteMovement = async(id: string) => {
    try {
        const deletedMovement = await axiosInstance.delete(`${URL_MOVEMENTS}/${id}`)
        return deletedMovement.data
    } catch (error: any) {
        console.log(error.message);
        ErrorAlert('Ups!', 'No se pudo eliminar el movimeinto')
    }
}