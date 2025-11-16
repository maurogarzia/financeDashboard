

export interface IMovements{
    _id?: string | null,
    date : Date,
    description: string,
    type : 'income' | 'expense' | '',
    amount: number,
}

