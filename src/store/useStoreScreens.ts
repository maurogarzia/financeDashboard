import { create } from "zustand";

interface IUseStoreScreens {
    type : string,
    setType : (newoption: string) => void

}

const useStoreScreens = create<IUseStoreScreens>((set) => ({
    type : 'home',

    setType: (newOption) => set({type : newOption})

}))

export default useStoreScreens