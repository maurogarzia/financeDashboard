
import useStoreModal from '../../store/useStoreModal'
import style from './TableOfMovents.module.css'
import { useEffect, useState } from 'react'
import useStoreMovements from '../../store/useStoreMovements'
import type { IMovements } from '../../types/IMovements'
import { deleteMovement } from '../../cruds/crudMovements'
import { SuccesAlert } from '../../utils/SuccesAlert'


export const TableOfMovents = () => {

    const {
        movementsOfUser,
        listExpenses, 
        listIncome, 
        listAncient, 
        listRecent, 
        listMovementsOfMonth,
        setActiveMovement, 
        refreshAll,
        fetchListMovementsOfmonth

    } = useStoreMovements()

    const {openView} = useStoreModal()

    const [viewMovements, setViewMovements] = useState<string>('allsMovents')
    const [search, setSearch] = useState<string>('')


    // UseEffect para los filtros de ingresos y gastos
    useEffect(() => {
        refreshAll()
    },[])

    // Barra de bsuqueda
    const listFilter = movementsOfUser.filter((m) => {
        const term = search.toLocaleLowerCase()
        return (
            m.description.toLocaleLowerCase().includes(term) || 
            m.type.toLocaleLowerCase().includes(term) || 
            String(m.date).toLocaleLowerCase().includes(term) || 
            String(m.amount).toLocaleLowerCase().includes(term)
        )
    })    
    
    const handleEdit = (movement : IMovements) => {
        setActiveMovement(movement)
        openView()
    }
    

    const handleDelete = async(id : string) => {
        await deleteMovement(id)
        SuccesAlert('Eliminado', 'Se eliminó el movimeinto')
        refreshAll()
    }

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndSearch}>

                <div className={style.containerTitle}>
                    <h2>Movimientos del mes</h2>
                    <form className={style.containerSearch}>
                        <input type="text" placeholder='Buscar' value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <button type='submit'>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        
                    </form>
                    <div className={style.buttons}>

                        <button onClick={() => {openView()}}>Agregar Movimiento</button>
                        <button onClick={() => setViewMovements('allsMovents')}>Todos</button>
                        <button onClick={() => setViewMovements('incomes')}>Ingresos</button>
                        <button onClick={() => setViewMovements('expenses')}>Gastos</button>
                        <button onClick={() => setViewMovements('ancient')}>Mas antiguo</button>
                        <button onClick={() => setViewMovements('recent')}>Reciente</button>
                    </div>
                </div>

            </div>


            <div className={style.containerMovents}>
                {listMovementsOfMonth.length < 1 && <p>No hay movimientos registrados</p>}

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

                        {/* Todos los movimientos */}

                        {(viewMovements === 'allsMovents' && search === '') && listMovementsOfMonth.map((m) => (
                            
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                
                                    <td>{m.description}</td>

                                    <td className={m.type === 'income' ? style.income : style.expense}>
                                        {m.type === 'income' ? 'Ingreso' : 'Gasto'}
                                    </td>

                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Ingresos */}

                        {(viewMovements === 'incomes' && search === '') && listIncome.map((m) => (
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                    <td>{m.description}</td>
                                    <td className={style.income}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Gastos */}
                        {(viewMovements === 'expenses' && search === '') && listExpenses.map((m) => (
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                    <td>{m.description}</td>
                                    <td className={ style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Mas antiguo */}
                        {(viewMovements === 'ancient' && search === '') && listAncient.map((m) => (
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'income' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Mas reciente */}
                        {(viewMovements === 'recent' && search === '') && listRecent.map((m) => (
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'income' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Barra de busqueda */}
                        {(search !== '') && listFilter.map((m) => (
                            <tr key={m._id}>
                                <td className={style.date}>{m.date.toString().split('T')[0]}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'income' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m._id!)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}