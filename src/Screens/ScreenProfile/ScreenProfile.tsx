import { Header } from '../../components/Header/Header'
import { InitSession } from '../../components/InitSession/InitSession'
import { Profile } from '../../components/Profile/Profile'
import style from './ScreenProfile.module.css'

export const ScreenProfile = () => {
    
    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <Profile/>
            <InitSession/>
        </div>
    )
}