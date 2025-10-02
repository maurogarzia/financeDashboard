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

    setActiveMovent: (incommingMovent : IMovents | null) => void
    addMovents : (newMovent : IMovents) => void
    deleteMovents: (id: string) => void,
    editMovents: (id: string, newMovent : IMovents) => void
    setListExpenses : VoidFunction,
    setLisIncome : VoidFunction
    setListRecent: VoidFunction
    setListAncient : VoidFunction

}

const useStoreMovents = create<IUseStoreMovents>()(
    persist((set) => ({
        movents : [],
        activeMovent : null,
        listExpenses : [],
        listIncome : [],
        listAncient: [],
        listRecent: [],

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
            listIncome : state.movents.filter((i) => i.type === "ingreso")
        })),

        setListExpenses : () => set((state) => ({
            listExpenses : state.movents.filter((i) => i.type === "gasto")
        })),

        setListAncient: () => set((state) => ({
            listAncient : state.movents.slice().sort((a,b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
        })),

        setListRecent : () => set((state) => ({
            listRecent : state.movents.slice().sort((a,b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
        }))
    }),
        {name : "movents-storage"}
    )
    )



export default useStoreMovents