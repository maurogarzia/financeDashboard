import type { IMovents } from "./IMovents"

export interface IUser{
    id: string
    fullName: string,
    email: string,
    avatar: string,
    movements: IMovents[],
    role: 'user' | 'admin'
}