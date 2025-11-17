
import useStoreModal from '../../store/useStoreModal'
import style from './SummaryOfMonths.module.css'
import { useEffect, useState } from 'react'
import useStoreMovements from '../../store/useStoreMovements'
import type { IMovements } from '../../types/IMovements'
import { deleteMovement } from '../../cruds/crudMovements'
import { SuccesAlert } from '../../utils/SuccesAlert'
import { DownloadMovent } from '../DownloadMovent/DownloadMovent'
import { calculate } from '../../utils/calculate'


export const SummaryOfMonths = () => {

    const {setActiveMovement, fetchListMonthAndYear, listOfMonthAndYear, refreshAll} = useStoreMovements() 
    const {openView} = useStoreModal()

    
    
    const today = new Date() // Fecha de hoy
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1
    
    const yearsArray = Array.from({length: currentYear - 2019}, (_,i) => 2020 + i) // Array de anios
    
    // Valores inicales
    const [year, setYear] = useState(currentYear) 
    const [month, setMonth] = useState(currentMonth)
    
    useEffect(() => {
        fetchListMonthAndYear(year, month)
    },[year, month])
    
    

    
    const {expense, income, balance} = calculate(listOfMonthAndYear)
    

    const months = [
        { value: 0, label: "Enero" },
        { value: 1, label: "Febrero" },
        { value: 2, label: "Marzo" },
        { value: 3, label: "Abril" },
        { value: 4, label: "Mayo" },
        { value: 5, label: "Junio" },
        { value: 6, label: "Julio" },
        { value: 7, label: "Agosto" },
        { value: 8, label: "Septiembre" },
        { value: 9, label: "Octubre" },
        { value: 10, label: "Noviembre" },
        { value: 11, label: "Diciembre" }
    ];

    const handleEdit= (movement: IMovements) => {
        setActiveMovement(movement)
        openView()
    }

    const handleDelete = async(id: string) => {
        await deleteMovement(id)
        SuccesAlert('Eliminado', 'Se eliminó el movimeinto')
        refreshAll()
    }

    return (
        <div className={style.containerPrincipal}>
            
            <select className={style.containerSelect} value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {yearsArray.map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>
            
            
            
            <select className={style.containerSelect} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {months.map(m => (
                    <option key={m.value} value={m.value + 1}>{m.label}</option>
                ))}
            </select>
            

            <div className={style.containerMovements}>
                {listOfMonthAndYear.length < 1
                    ? 
                        <p className={style.emptyList}>No hay movimientos</p>
                    :
                        <div className={style.containerMovement}>

                            <div className={style.containerBalance}>
                                <p>Gasto: $ {expense}</p>
                                <p>Ingreso: $ {income}</p>
                                <p>Balance: $ {balance}</p>
                                <DownloadMovent resume={listOfMonthAndYear} income={income} expense={expense} balance={balance} year={year}/>
                            </div>
                            
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
                                    {listOfMonthAndYear.map(movement => (

                                        <tr>
                                            <td>{String(movement.date).split('T')[0]}</td>
                                            <td>{movement.description}</td>
                                            <td className={movement.type === 'income' ? style.income : style.expense}>
                                                {movement.type === 'income' ? 'Ingreso' : 'Gasto'}
                                            </td>
                                            <td>{movement.amount}</td>
                                            <td>
                                                <div className={style.containerButtons}>
                                                    <button className={style.edit} onClick={() => handleEdit(movement)}>
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button className={style.delete} onClick={() => handleDelete(movement._id!)}>
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}                                        

                                </tbody>
                            </table>
                            
                        </div>
                }
            </div>
        </div>
    )
}