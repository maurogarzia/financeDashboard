import { create } from "zustand";

interface IUseStoreModal{
    view: boolean
    openView: VoidFunction
    closeView: VoidFunction 
}

const useStoreModal = create<IUseStoreModal>((set) => ({
    view: false,

    openView : () => set({view : true}),
    closeView: () => set({view: false})
}))

export default useStoreModal