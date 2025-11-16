import type { IMovements } from "./IMovements"


export interface IUser{
    _id: string
    fullName: string,
    email: string,
    avatar: string,
    movements: IMovements[],
    role: 'user' | 'admin'
}