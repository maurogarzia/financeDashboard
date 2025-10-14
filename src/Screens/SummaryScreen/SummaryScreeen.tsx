import { Header } from '../../components/Header/Header'
import useStoreModal from '../../store/useStoreModal'
import style from './SummaryScreen.module.css'

export const SummaryScreen = () =>{

    const {setViewScreen} = useStoreModal()

    return (
        <div className={style.containerPrincipal}>
            <Header/>
            <div className={style.backButton}>
                <button onClick={() => setViewScreen(false)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
        </div>
    )
}