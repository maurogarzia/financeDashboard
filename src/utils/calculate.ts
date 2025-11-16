import type { IMovents } from "../types/IMovements"

export const calculate = (list : IMovents[]) => {
    let income = 0
    let expense = 0

    list.forEach((f) => {
        if (f.type === 'ingreso') {
            income += f.amount
        } else if (f.type === 'gasto') {
            expense += f.amount
        }
    })

    const balance = income - expense
    return {income, expense, balance}
}