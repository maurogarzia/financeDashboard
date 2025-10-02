import Swal from 'sweetalert2'
import useStoreModal from '../../store/useStoreModal'
import useStoreMovents from '../../store/useStoreMovents'
import type { IMovents } from '../../types/IMovents'
import style from './TableOfMovents.module.css'
import { useEffect, useState } from 'react'

export const TableOfMovents = () => {

    const {
        movents, setLisIncome, setListExpenses, listExpenses, listIncome, setActiveMovent, deleteMovents, setListAncient, setListRecent, listAncient, listRecent
    } = useStoreMovents()
    const {openView} = useStoreModal()

    const [viewMovents, setViewMovents] = useState<string>('allsMovents')
    const [search, setSearch] = useState<string>('')

    // UseEffect para los filtros de ingresos y gastos
    useEffect(() => {
        setLisIncome(),
        setListExpenses(),
        setListRecent(),
        setListAncient()
    },[movents])


    // Barra de bsuqueda
    const listFilter = movents.filter((m) => {
        const term = search.toLocaleLowerCase()
        return (
            m.description.toLocaleLowerCase().includes(term) || 
            m.type.toLocaleLowerCase().includes(term) || 
            m.date.toLocaleLowerCase().includes(term)
        )
    })


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
            <div className={style.containerTitleAndSearch}>

                <div className={style.containerTitle}>
                    <h2>Movimientos</h2>
                    <div className={style.buttons}>

                        <button onClick={() => {openView()}}>Agregar Movimiento</button>
                        <button onClick={() => setViewMovents('allsMovents')}>Todos</button>
                        <button onClick={() => setViewMovents('incomes')}>Ingresos</button>
                        <button onClick={() => setViewMovents('expenses')}>Gastos</button>
                        <button onClick={() => setViewMovents('ancient')}>Mas antiguo</button>
                        <button onClick={() => setViewMovents('recent')}>Reciente</button>
                    </div>
                </div>

                <form className={style.containerSearch}>
                    <input type="text" placeholder='Buscar' value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button type='submit'>
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    
                </form>
            </div>


            <div className={style.containerMovents}>
                {movents.length < 1 && <p>No hay movimientos registrados</p>}

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

                        {(viewMovents === 'allsMovents' && search === '') && movents.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'ingreso' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Ingresos */}

                        {(viewMovents === 'incomes' && search === '') && listIncome.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={style.income}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Gastos */}
                        {(viewMovents === 'expenses' && search === '') && listExpenses.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={ style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Mas antiguo */}
                        {(viewMovents === 'ancient' && search === '') && listAncient.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'ingreso' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Mas reciente */}
                        {(viewMovents === 'recent' && search === '') && listRecent.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'ingreso' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}

                        {/* Barra de busqueda */}
                        {(search !== '') && listFilter.map((m) => (
                            <tr>
                                <td className={style.date}>{m.date}</td>
                                    <td>{m.description}</td>
                                    <td className={m.type === 'ingreso' ? style.income : style.expense}>{m.type}</td>
                                    <td>$ {m.amount}</td>
                                    <td>
                                        <div className={style.containerButtons}>
                                            <button className={style.edit} onClick={() => handleEdit(m)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className={style.delete} onClick={() => handleDelete(m.id)}>
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