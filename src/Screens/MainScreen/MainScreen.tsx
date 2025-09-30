import { AddMovents } from '../../components/AddMovents/AddMovents'
import { Header } from '../../components/Header/Header'
import { Home } from '../../components/Home/Home'
import useStoreModal from '../../store/useStoreModal'
import style from './MainScreen.module.css'


export const MainScreen = () => {

    const {view} = useStoreModal()

    return (
        
        <div className={style.containerPrincipal}>
            <Header/>
            <Home/>
            {view && <div className={style.modalBackdrop}><AddMovents/></div>}
        </div>
    )
}