import type { IMovements} from "../types/IMovements"

export const calculate = (list : IMovements[]) => {
    let income = 0
    let expense = 0

    list.forEach((f) => {
        if (f.type === 'income') {
            income += f.amount
        } else if (f.type === 'expense') {
            expense += f.amount
        }
    })

    const balance = income - expense
    return {income, expense, balance}
}