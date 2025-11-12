import { create } from "zustand";
import type { IMovements } from "../types/IMovents";
import { persist } from "zustand/middleware";
import { getAllMovementsForUsers, getAncientsForUser, getByTypeForUser, getMovementsOfMonth, getRecentsForUser } from "../cruds/crudMovements";


interface IUseStoreMovents{
    movementsOfUser : IMovements[]
    activeMovement : IMovements | null
    listExpenses : IMovements[] | []
    listIncome : IMovements[] | []
    listAncient : IMovements[] | []
    listRecent : IMovements[] | []
    listMovementsOfMonth: IMovements[] | []

    fetchMovements : () => void
    setActiveMovement : (incommingMovement : IMovements | null) => void
    fetchListExpenses: (type: 'expense' ) => void
    fetchListIncomes: (type: 'income') => void
    fetchListAncients: () => void
    fetchListRecents: () => void
    fetchListmovementsOfmonth: () => void
}



const useStoreMovents = create<IUseStoreMovents>()(
    persist((set) => ({
        movementsOfUser : [],
        activeMovement : null,
        listExpenses : [],
        listIncome : [],
        listAncient: [],
        listRecent: [],
        listMovementsOfMonth: [],

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

        fetchListmovementsOfmonth: async() => {
            const fetchedMovements = await getMovementsOfMonth()
            set({listMovementsOfMonth: fetchedMovements})
        }
    }),
        {name : "movents-storage"}
    )
    )



export default useStoreMovents