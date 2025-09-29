import { Header } from '../../components/Header/Header'
import { Home } from '../../components/Home/Home'
import style from './MainScreen.module.css'


export const MainScreen = () => {
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <Home/>
        </div>
    )
}