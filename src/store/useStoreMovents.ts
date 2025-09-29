import { create } from "zustand";
import type { IMovents } from "../types/IMovents";

interface IUseStoreMovents{
    movents : IMovents[]

    setMovents : (newMovent : IMovents) => void
}

const useStoreMovents = create<IUseStoreMovents>((set) => ({
    movents : [],

    setMovents : (newMovent) => set((state) => ({
        movents : [...state.movents, newMovent],
    }))
}))

export default useStoreMovents