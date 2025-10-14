import { create } from "zustand";
import type { IMovents } from "../types/IMovents";
import { persist } from "zustand/middleware";

interface IUseStoreMovents{
    movents : IMovents[]
    activeMovent : IMovents | null
    listExpenses : IMovents[] | []
    listIncome : IMovents[] | []
    listAncient : IMovents[] | []
    listRecent : IMovents[] | []
    listMoventsOfMonth: IMovents[] | []

    setActiveMovent: (incommingMovent : IMovents | null) => void
    addMovents : (newMovent : IMovents) => void
    deleteMovents: (id: string) => void,
    editMovents: (id: string, newMovent : IMovents) => void
    setListExpenses : VoidFunction,
    setLisIncome : VoidFunction
    setListRecent: VoidFunction
    setListAncient : VoidFunction
    setListMoventsOfMonths : () => void

}

const useStoreMovents = create<IUseStoreMovents>()(
    persist((set) => ({
        movents : [],
        activeMovent : null,
        listExpenses : [],
        listIncome : [],
        listAncient: [],
        listRecent: [],
        listMoventsOfMonth: [],

        setActiveMovent: (incommingMovent) => set({activeMovent : incommingMovent}),

        addMovents : (newMovent) => set((state) => ({
            movents : [...state.movents, newMovent],
        })),

        deleteMovents : (id) => set((state) => ({
            movents : state.movents.filter((f) => (
                f.id !== id
            ))
        })),


        editMovents: (id, newMovent) => set((state) => ({
            movents : state.movents.map((m) => (
                m.id === id ? newMovent : m
            ))
        })),

        setLisIncome : () => set((state) => ({
            listIncome : state.listMoventsOfMonth.filter((i) => i.type === "ingreso")
        })),

        setListExpenses : () => set((state) => ({
            listExpenses : state.listMoventsOfMonth.filter((i) => i.type === "gasto")
        })),

        setListAncient: () => set((state) => ({
            listAncient : state.listMoventsOfMonth.slice().sort((a,b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
        })),

        setListRecent : () => set((state) => ({
            listRecent : state.listMoventsOfMonth.slice().sort((a,b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
        })),

        setListMoventsOfMonths : () => {
            const month = new Date().toISOString().split('T')[0].split('-')[1]
            set((state) => ({
                listMoventsOfMonth: state.movents.filter((f) => 
                    f.date.split('-')[1] === month
                )
            }))
        }
    }),
        {name : "movents-storage"}
    )
    )



export default useStoreMovents