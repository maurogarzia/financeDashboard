import React, { useState } from 'react'
import style from './AddMovements.module.css'
import type { IMovements } from '../../types/IMovements'
import useStoreModal from '../../store/useStoreModal'
import useStoreMovements from '../../store/useStoreMovements'
import { createMovement, updateMovement } from '../../cruds/crudMovements'
import { SuccesAlert } from '../../utils/SuccesAlert'


export const AddMovements = () => {

    const {activeMovement, setActiveMovement, refreshAll} = useStoreMovements()
    
    const {closeView} = useStoreModal()

    const [movement, setMovement] = useState<IMovements>({
        _id:activeMovement?._id || null,
        date:activeMovement?.date || new Date(),
        description:activeMovement?.description ?? '',
        type: activeMovement?.type || '',
        amount :activeMovement?.amount || 0,
        
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        try {
            if (name === 'date'){
                setMovement(prev => ({
                    ...prev,
                    date: new Date(e.target.value)
                }))
            } else {

                setMovement((prev) => ({
                    ...prev,
                    [name]: name === "amount" ? Number(value) : value,
                }))
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    const handelClose = () => {
        closeView()
        setActiveMovement(null)
    }

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()

        try {
            if (activeMovement) {
                updateMovement(movement, activeMovement._id!)
                closeView()
                setActiveMovement(null)
                SuccesAlert('Editado', 'Movimiento editado con éxito')
                refreshAll()

            } else {
                const {_id, ...movementToCreate} = movement
                createMovement(movementToCreate)
                closeView()
                SuccesAlert('Creado', 'Movimiento creado con éxito')
                refreshAll()
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>{activeMovement ? 'Editar Movimiento' : 'Ingresar nuevo movimiento'}</h1>

            <div className={style.contanierData}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="">Fecha</label> 
                    <input type="date" name="date" value={movement.date ? new Date(movement.date).toISOString().split('T')[0] : ''} required onChange={handleChange}/>

                    <label>Tipo</label>
                    <select name="type" onChange={handleChange} value={movement.type} required>
                        <option value={""} disabled>Sin selección</option>
                        <option value="income">Ingreso</option>
                        <option value="expense">Gasto</option>
                    </select>

                    <label htmlFor="">Monto</label>
                    <input type="number" name="amount" value={movement.amount || ''} required step={0.01} min={1} onChange={handleChange} />

                    <label htmlFor="">Descripción</label>
                    <textarea name="description" required value={movement.description} onChange={handleChange}></textarea>

                    <div className={style.containerButtons}>
                        <button type='button' onClick={handelClose}>Cerrar</button>
                        <button type='submit'>{activeMovement ? 'Editar' : 'Crear'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}