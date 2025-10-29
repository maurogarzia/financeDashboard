import Swal from 'sweetalert2'
import useStoreModal from '../../store/useStoreModal'
import useStoreMovents from '../../store/useStoreMovents'
import type { IMovents } from '../../types/IMovents'
import style from './SummaryOfMonths.module.css'

import { calculate } from '../../utils/calculate'
import { DownloadMovent } from '../DownloadMovent/DownloadMovent'
import { useState } from 'react'

export const SummaryOfMonths = () => {

    const {movents, setActiveMovent, deleteMovents} = useStoreMovents()
    const {openView} = useStoreModal()


    const [showMonth, setShowMonth] = useState<{ [key: string]: boolean }>({});

    const months = [
        ['Enero', '01'],
        ['Febrero', '02'],
        ['Marzo', '03'],
        ['Abril', '04'],
        ['Mayo', '05'],
        ['Junio', '06'],
        ['Julio', '07'],
        ['Agosto', '08'],
        ['Septiembre', '09'],
        ['Octubre', '10'],
        ['Noviembre', '11'],
        ['Diciembre', '12']
    ]

    const handleEdit = (movent : IMovents) => {
        setActiveMovent(movent)
        openView()
    }

    const handleDelete = (id : string) => {
        deleteMovents(id)
        Swal.fire({
            title : 'Eliminado',
            text : 'Se eliminó el movimiento',
            icon: 'success'
        })
    }


    return (
        <div className={style.containerPrincipal}>
            {months.map((month) => {
                // Filtro por mes
                
                const monthMovent = movents.filter((m) => m.date.split('-')[1] === month[1])
                const {income, expense, balance} = calculate(monthMovent)
                return (
                    <div key={month[1]} className={style.containerMonths}>

                        <h2 
                        className={style.title}
                        onClick={() => 
                            setShowMonth(prev => ({
                                ...prev,
                                [month[1]] : !prev[month[1]]
                            }))
                        }>
                            {month[0]}
                            {showMonth[month[1]] 
                                ? 
                                    <span className="material-symbols-outlined">arrow_drop_down</span> 
                                : 
                                    <span className="material-symbols-outlined">arrow_left</span>}
                            
                        </h2>

                        {showMonth[month[1]] && (
                            monthMovent.length < 1 
                                ? 
                                <div className={style.month}>
                                    <p>No hay Movimientos</p>
                                </div>
                                : 
                                <div className={`${style.moventsOfMonth} ${showMonth[month[1]] ? style.open : style.closed}`}>

                                    <div className={style.resume}>
                                        <p>Ingresos: $ {income}</p>
                                        <p>Gastos : $ {expense}</p>
                                        <p>Balance: $ {balance}</p>
                                        <div style={{'width' : '100%', 'display' : 'flex', 'justifyContent' : 'center'}}>
                                            <DownloadMovent resume={monthMovent} income={income} expense={expense} balance={balance}/>
                                        </div>
                                        
                                    </div>

                                    {
                                        monthMovent.map((movent) => (
                                                
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
                                                    <tr>
                                                        <td className={style.date}>{movent.date}</td>
                                                        <td>{movent.description}</td>
                                                        <td className={movent.type === 'ingreso' ? style.income : style.expense}>{movent.type}</td>
                                                        <td>{movent.amount}</td>
                                                        <td>

                                                            <div className={style.containerButtons}>
                                                                <button className={style.edit} onClick={() => handleEdit(movent)}>
                                                                    <span className="material-symbols-outlined">edit</span>
                                                                </button>

                                                                <button className={style.delete} onClick={() => handleDelete(movent.id)}>
                                                                    <span className="material-symbols-outlined">delete</span>
                                                                </button>
                                                            </div>
                                                            
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            
                                        ))
                                    }
                                </div>

                        )}
                        
                    </div>
                )
            })}
        </div>
    )
}