import { AddMovents } from '../../components/AddMovents/AddMovents'
import { Header } from '../../components/Header/Header'
import { Home } from '../../components/Home/Home'
import useStoreScreens from '../../store/useStoreScreens'
import style from './MainScreen.module.css'


export const MainScreen = () => {

    const {type} = useStoreScreens()

    return (
        
        <div className={style.containerPrincipal}>
            <Header/>
            {type === 'home' && <Home/>}
            {type === 'addMovents' && <AddMovents/>}
        </div>
    )
}