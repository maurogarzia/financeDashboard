import style from './Header.module.css'

export const Header = () => {
    return (
        <div className={style.containerPrincipal}>
            <h1>Dashboard de Finanzas</h1>
            <p>Inicio</p>
            <p>Ingresar Movimiento</p>

        </div>
    )
}