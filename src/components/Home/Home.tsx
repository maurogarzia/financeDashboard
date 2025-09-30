import { useEffect, useState } from 'react'
import useStoreMovents from '../../store/useStoreMovents'
import style from './Home.module.css'
import useStoreModal from '../../store/useStoreModal'


export const Home = () => {

    const {movents} = useStoreMovents()
    const {openView} = useStoreModal()

    const [income, setIncome] = useState<number>(0)
    const [bills, setBills] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)

    useEffect(() => {

        const calculate = () => {
            let incomes = 0
            let billss = 0 
            let balances  = 0
    
            movents.forEach(m => {
                if (m.type === 'ingreso') {
                    incomes += m.amount
                    
                } else if (m.type === 'gasto'){
                    billss += m.amount
                }
            })
            
            setIncome(incomes)
            setBills(billss)

    
            balances = incomes - billss

            setBalance(balances)
    
        }

        calculate()
    },[movents])
    

    return (
        <div className={style.containerPrincipal}>
            
            <h1>Balance General</h1>

            <div className={style.containerData}>
                <p>Ingresos: $ {income}</p>

                <p>Gastos: $ {bills}</p>

                <div className={style.containerBalance}>
                    <p>Balance: $ {balance}</p>
                    {balance > 0 && <div style={{"color" : "green", "display" : "flex", "alignItems" : "center"}}><span className="material-symbols-outlined">trending_up</span></div>}
                    {balance < 0 && <div style={{"color" : "red", "display" : "flex", "alignItems" : "center"}}><span className="material-symbols-outlined">trending_down</span></div>}
                </div>
            </div>

            <hr />

            <div className={style.containerMovents}>
                <div className={style.containerTitle}>
                    <h2>Movimientos</h2>
                    <button onClick={openView}>Agregar Movimiento</button>
                </div>

                {movents.length === 0 ? <div className={style.emptyMovents}><p>No hay movimientos registrados</p></div> : (

                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripcion</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {movents.map(m => (
                                    <tr>
                                        <td>{m.date}</td>
                                        <td>{m.description}</td>
                                        <td className={m.type === 'ingreso' ? style.income : style.expense}>{m.type}</td>
                                        <td>$ {m.amount}</td>
                                        <td>
                                            <div className={style.containerButtons}>
                                                <button className={style.edit}>
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button className={style.delete}>
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                ) }
            </div>
            
        </div>
    )
}