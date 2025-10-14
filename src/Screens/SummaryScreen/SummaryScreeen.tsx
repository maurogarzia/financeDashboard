import { AddMovents } from '../../components/AddMovents/AddMovents'
import { Header } from '../../components/Header/Header'
import { SummaryOfMonths } from '../../components/SummaryOfMonths/SummaryOfMonths'
import useStoreModal from '../../store/useStoreModal'
import style from './SummaryScreen.module.css'

export const SummaryScreen = () =>{

    const {setViewScreen, view} = useStoreModal()

    return (
        <div className={style.containerPrincipal}>
            <Header/>
            {view && <div className={style.modalBackdrop}><AddMovents/></div>}
            <div className={style.backButton}>
                <button onClick={() => setViewScreen(false)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            <SummaryOfMonths/>
            </div>
        </div>
    )
}