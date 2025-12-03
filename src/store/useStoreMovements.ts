import { create } from "zustand";
import type { IMovements } from "../types/IMovements";
import { persist } from "zustand/middleware";
import { getAllMovementsForUsers, getAncientsForUser, getByDate, getByTypeForUser, getMovementsOfMonth, getRecentsForUser } from "../cruds/crudMovements";


interface IUseStoreMovements{
    movementsOfUser : IMovements[]
    activeMovement : IMovements | null
    listExpenses : IMovements[] | []
    listIncome : IMovements[] | []
    listAncient : IMovements[] | []
    listRecent : IMovements[] | []
    listMovementsOfMonth: IMovements[] | []
    listOfMonthAndYear: IMovements[] | []

    fetchMovements : () => void
    setActiveMovement : (incommingMovement : IMovements | null) => void
    fetchListExpenses: (type: 'expense' ) => void
    fetchListIncomes: (type: 'income') => void
    fetchListAncients: () => void
    fetchListRecents: () => void
    fetchListMovementsOfmonth: () => void
    fetchListMonthAndYear: (year: number, month: number) => void

    refreshAll: () => void
}



const useStoreMovements = create<IUseStoreMovements>()(
    persist((set) => ({
        movementsOfUser : [],
        activeMovement : null,
        listExpenses : [],
        listIncome : [],
        listAncient: [],
        listRecent: [],
        listMovementsOfMonth: [],
        listOfMonthAndYear: [],

        fetchMovements: async() => {
            const fetchedMovements = await getAllMovementsForUsers() 
            set({movementsOfUser : fetchedMovements})
        },

        setActiveMovement : (incommingMovement) => set({activeMovement : incommingMovement}),
        
        fetchListExpenses : async(type) => {
            const fetchedMovements = await getByTypeForUser(type)
            set({listExpenses : fetchedMovements})
        },

        fetchListIncomes: async(type) => {
            const fetchedMovements = await getByTypeForUser(type)
            set({listExpenses: fetchedMovements})
        },

        fetchListAncients: async() => {
            const fetchedMovements = await getAncientsForUser()
            set({listAncient: fetchedMovements})
        },

        fetchListRecents: async() => {
            const fetchedMovements = await getRecentsForUser()
            set({listRecent : fetchedMovements})
        },

        fetchListMovementsOfmonth: async() => {
            const fetchedMovements = await getMovementsOfMonth()
            set({listMovementsOfMonth: fetchedMovements})
        },

        fetchListMonthAndYear: async(year, month) => {
            const fetchedMovements = await getByDate(year, month)
            set({listOfMonthAndYear: fetchedMovements})
        },

        refreshAll: async() => {
            const [
                expenses,
                incomes,
                recents,
                ancients,
                monthMovements,
                allMovements
            ] = await Promise.all([
                getByTypeForUser("expense"),
                getByTypeForUser("income"),
                getRecentsForUser(),
                getAncientsForUser(),
                getMovementsOfMonth(),
                getAllMovementsForUsers()
            ])

            set({
                listExpenses: expenses,
                listIncome: incomes,
                listRecent: recents,
                listAncient: ancients,
                listMovementsOfMonth: monthMovements,
                movementsOfUser: allMovements
            })
        }
    }),
        {name : "movents-storage"}
    )
    )



export default useStoreMovements