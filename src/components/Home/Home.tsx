

import style from './Home.module.css'
import { BalanceChart } from '../BalanceCharts/BalanceCharts'
import { TableOfMovents } from '../TableOfMovents/TableOfMovents'
import { useNavigate } from 'react-router'
import { calculate } from '../../utils/calculate'
import useStoreMovements from '../../store/useStoreMovements'


export const Home = () => {

    const {movementsOfUser} = useStoreMovements()
    const navigate = useNavigate()


    

    
    const {balance, expense, income} = calculate(movementsOfUser)
    
    
    // Funcion que navega hacia la pagina de resumenes
    const navigateFromSummary = () => {
        navigate('summaryMovements')
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>Balance General</h1>

            <div className={style.containerData}>
                
                <p>Ingresos: $ {income}</p>

                <p>Gastos: $ {expense}</p>

                <div className={style.containerBalance}>
                    <p>Balance: $ {balance.toFixed(2)}</p>
                    {balance > 0 && <div className={style.arrowGrren}><span className="material-symbols-outlined">trending_up</span></div>}
                    {balance < 0 && <div className={style.arrowRed}><span className="material-symbols-outlined">trending_down</span></div>}
                </div>
            </div>

            <div className={style.summaryButton}>
                <button onClick={navigateFromSummary}>Resumenes</button>
            </div>

            {movementsOfUser.length > 0 && <div className={style.containerPie}><BalanceChart/></div>  }
            

            <hr />

            {/* Tabla de movimientos */}
            <TableOfMovents/>

        </div>
    )
}