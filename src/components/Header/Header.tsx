import useStoreModal from '../../store/useStoreModal'
import style from './Header.module.css'

export const Header = () => {

    const {setViewScreen} = useStoreModal()

    return (
        <div className={style.containerPrincipal}>
            <h1>Gestión de Finanzas</h1>
            <span onClick={() => setViewScreen('profile')} className="material-symbols-outlined">account_circle</span>
        </div>
    )
}