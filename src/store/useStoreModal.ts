import { create } from "zustand";

interface IUseStoreModal{
    view: boolean
    viewScreen: string
    openView: VoidFunction
    closeView: VoidFunction 
    setViewScreen: (option: string) => void

}

const useStoreModal = create<IUseStoreModal>((set) => ({
    view: false,
    viewScreen: 'home',

    openView : () => set({view : true}),
    closeView: () => set({view: false}),

    setViewScreen: (option) => set({viewScreen: option})
}))

export default useStoreModal