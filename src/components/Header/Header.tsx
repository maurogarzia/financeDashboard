import useStoreScreens from '../../store/useStoreScreens'
import style from './Header.module.css'

export const Header = () => {

    const {setType} = useStoreScreens()

    return (
        <div className={style.containerPrincipal}>
            <h1>Gestión de Finanzas</h1>
            <p onClick={() => setType('home')}>Inicio</p>
            <p onClick={() => setType('addMovents')}>Ingresar Movimiento</p>

        </div>
    )
}