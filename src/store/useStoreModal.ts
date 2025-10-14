import { create } from "zustand";

interface IUseStoreModal{
    view: boolean
    viewScreen: boolean
    openView: VoidFunction
    closeView: VoidFunction 
    setViewScreen: (option: boolean) => void

}

const useStoreModal = create<IUseStoreModal>((set) => ({
    view: false,
    viewScreen: false,

    openView : () => set({view : true}),
    closeView: () => set({view: false}),

    setViewScreen: (option) => set({viewScreen: option})
}))

export default useStoreModal