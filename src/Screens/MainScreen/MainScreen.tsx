import { useEffect } from 'react'

import { Header } from '../../components/Header/Header'
import { Home } from '../../components/Home/Home'
import useStoreModal from '../../store/useStoreModal'
import { useStoreUser } from '../../store/useStoreUser'
import style from './MainScreen.module.css'
import { AddMovements } from '../../components/AddMovements/AddMovements'




export const MainScreen = () => {

    const {view} = useStoreModal()
    const {setUserLogged, userLogged} = useStoreUser()

    useEffect(() => {
        if (!userLogged) setUserLogged()
    },[userLogged, setUserLogged])

    return (
        
        <div className={style.containerPrincipal}>
            <Header/>
            <Home/>
            {view && <div className={style.modalBackdrop}><AddMovements/></div>}
        </div>
    )
}