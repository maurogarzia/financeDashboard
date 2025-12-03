import type { IMovements} from "../types/IMovements"

export const calculate = (list : IMovements[]) => {
    let income = 0
    let expense = 0

    list.forEach((f) => {

        const amount = Number(f.amount)

        if (f.type === 'income') {
            income += amount
        } else if (f.type === 'expense') {
            expense += amount
        }
    })

    const balance = income - expense
    return {income, expense, balance}
}