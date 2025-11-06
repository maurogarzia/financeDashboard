import useStoreModal from '../../store/useStoreModal'
import style from './Profile.module.css'

export const Profile = () => {

    const {setViewScreen} = useStoreModal()

    return (
        <div className={style.containerPrincipal}>
            
            <div className={style.arrowBack}>
                <button onClick={() => setViewScreen('home')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <div className={style.containerName}>
                <span onClick={() => setViewScreen('profile')} className="material-symbols-outlined">account_circle</span>
                <p>Mauro Garzia</p>
                <p>(maurogarzia2@gmail.com)</p>

            </div>

            <div className={style.item}>
                <button>Cerrar Sesion</button>
            </div>
        </div>
    )
}