import useStoreMovents from '../../store/useStoreMovents'
import style from './Home.module.css'

export const Home = () => {

    const {movents} = useStoreMovents()

    return (
        <div className={style.containerPrincipal}>
            <h1>Balance General</h1>

            <div className={style.containerData}>
                <p>Ingresos: $0</p>
                <p>Gastos: $0</p>
                <p>Balance: $0</p>
            </div>

            <hr />

            <div className={style.containerMovents}>
                <h2>Movimientos</h2>

                {movents.length === 0 ? <div><p>No hay movimientos registrados</p></div> : (

                    <table>
                        <thead>
                            <td>Fecha</td>
                            <td>Descripcion</td>
                            <td>Tipo</td>
                            <td>Monto</td>
                        </thead>

                        {movents.map(m => (
                            <tbody>
                                <td></td>
                                <td>{m.description}</td>
                                <td>{m.type}</td>
                                <td>{m.amount}</td>
                            </tbody>
                        ))}
                    </table>
                ) }
            </div>
        </div>
    )
}