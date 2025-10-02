import React, { useState } from 'react'
import style from './AddMovents.module.css'
import type { IMovents } from '../../types/IMovents'
import useStoreMovents from '../../store/useStoreMovents'
import useStoreModal from '../../store/useStoreModal'
import Swal from 'sweetalert2'


export const AddMovents = () => {

    const {addMovents, activeMovent, editMovents, setActiveMovent} = useStoreMovents()
    const {closeView} = useStoreModal()

    const [movent, setMovent] = useState<IMovents>({
        id:activeMovent?.id || crypto.randomUUID(),
        date:activeMovent?.date || '',
        description:activeMovent?.description ?? '',
        type: activeMovent?.type || '',
        amount :activeMovent?.amount || 0,
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        try {
            setMovent((prev) => ({
                ...prev,
                [name]: name === "amount" ? Number(value) : value,
            }))
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    const handelClose = () => {
        closeView()
        setActiveMovent(null)
    }

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (activeMovent) {
                editMovents(activeMovent.id, movent)
                closeView()
                setActiveMovent(null)
                Swal.fire({
                            title : 'Editado',
                            text : 'Se editó el movimiento',
                            icon: 'success'
                        })
            } else {
                addMovents(movent)
                closeView()
                setActiveMovent(null)
                Swal.fire({
                            title : 'Creado',
                            text : 'Se creó el movimiento',
                            icon: 'success'
                        })
            }
        } catch (error : any) {
            console.log(error.message);
            
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>Ingresar nuevo movimiento</h1>

            <div className={style.contanierData}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="">Fecha</label> 
                    <input type="date" name="date" value={movent.date} required onChange={handleChange}/>

                    <label>Tipo</label>
                    <select name="type" onChange={handleChange} value={movent.type} required>
                        <option value={""} disabled>Sin selección</option>
                        <option value="ingreso">Ingreso</option>
                        <option value="gasto">Gasto</option>
                    </select>

                    <label htmlFor="">Monto</label>
                    <input type="number" name="amount" value={movent.amount || ''} required step={0.01} min={1} onChange={handleChange} />

                    <label htmlFor="">Descripción</label>
                    <textarea name="description" required value={movent.description} onChange={handleChange}></textarea>

                    <div className={style.containerButtons}>
                        <button type='button' onClick={handelClose}>Cerrar</button>
                        <button type='submit'>{activeMovent ? 'Editar' : 'Crear'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}