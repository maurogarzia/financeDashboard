import Swal from 'sweetalert2'
import useStoreModal from '../../store/useStoreModal'
import useStoreMovents from '../../store/useStoreMovents'
import type { IMovents } from '../../types/IMovents'
import style from './SummaryOfMonths.module.css'

import { calculate } from '../../utils/calculate'

export const SummaryOfMonths = () => {

    const {movents, setActiveMovent, deleteMovents} = useStoreMovents()
    const {openView} = useStoreModal()

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
                        <h2 className={style.title}>{month[0]}</h2>
                        {monthMovent.length < 1 
                            ? 
                            <div className={style.month}>
                                <p>No hay Movimientos</p>
                            </div>
                            : 
                            <div className={style.moventsOfMonth}>

                                <div className={style.resume}>
                                    <p>Ingresos: $ {income}</p>
                                    <p>Gastos : $ {expense}</p>
                                    <p>Balance: $ {balance}</p>
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
                        }
                    </div>
                )
            })}
        </div>
    )
}