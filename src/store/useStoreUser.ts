import { create } from "zustand";
import type { IUser } from "../types/IUser";
import { getUserLogged } from "../cruds/crudsUsers";
import { persist } from "zustand/middleware";

interface IUseStoreUser {
    userLogged : IUser | null,
    setUserLogged : () => void

}

export const useStoreUser = create<IUseStoreUser>()(
    persist(
        (set) => ({

            userLogged : null,
            setUserLogged: async() => {
                const fetchUserLogged = await getUserLogged()
                set({userLogged : fetchUserLogged})
            }
        }
    ),
    {
        name: "user-storage"
    }
    )
)
