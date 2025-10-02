import { useEffect, useState } from 'react'
import useStoreMovents from '../../store/useStoreMovents'
import style from './Home.module.css'
import { BalanceChart } from '../BalanceCharts/BalanceCharts'
import { TableOfMovents } from '../TableOfMovents/TableOfMovents'


export const Home = () => {

    const {movents} = useStoreMovents()
    

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
                    <p>Balance: $ {balance.toFixed(2)}</p>
                    {balance > 0 && <div className={style.arrowGrren}><span className="material-symbols-outlined">trending_up</span></div>}
                    {balance < 0 && <div className={style.arrowRed}><span className="material-symbols-outlined">trending_down</span></div>}
                </div>
            </div>

            {movents.length > 0 && <div className={style.containerPie}><BalanceChart/></div>  }
            

            <hr />

            {/* Tabla de movimientos */}
            <TableOfMovents/>

        </div>
    )
}