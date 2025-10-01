import { create } from "zustand";
import type { IMovents } from "../types/IMovents";

interface IUseStoreMovents{
    movents : IMovents[]
    activeMovent : IMovents | null

    setActiveMovent: (incommingMovent : IMovents | null) => void
    addMovents : (newMovent : IMovents) => void
    deleteMovents: (id: string) => void,
    editMovents: (id: string, newMovent : IMovents) => void
}

const useStoreMovents = create<IUseStoreMovents>((set) => ({
    movents : [],
    activeMovent : null,

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
    }))
}))

export default useStoreMovents