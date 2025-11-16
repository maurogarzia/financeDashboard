import { useNavigate } from 'react-router'

import { Header } from '../../components/Header/Header'
import { SummaryOfMonths } from '../../components/SummaryOfMonths/SummaryOfMonths'
import useStoreModal from '../../store/useStoreModal'
import style from './SummaryScreen.module.css'
import { AddMovements } from '../../components/AddMovements/AddMovements'

export const SummaryScreen = () =>{

    const navigate = useNavigate()
    const {view} = useStoreModal()

    // Funcion que navega al home
    const navigateToProfile = () => {
        navigate('/')
    }

    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <div className={style.backButton}>
                <button onClick={navigateToProfile}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            <SummaryOfMonths/>
            </div>
            {view && <div className={style.modalBackdrop}><AddMovements/></div>}
        </div>
    )
}