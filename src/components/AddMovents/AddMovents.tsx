import React, { useState } from 'react'
import style from './AddMovents.module.css'
import type { IMovents } from '../../types/IMovents'
import useStoreMovents from '../../store/useStoreMovents'
import useStoreModal from '../../store/useStoreModal'


export const AddMovents = () => {

    const {addMovents} = useStoreMovents()
    const {closeView} = useStoreModal()

    const [movent, setMovent] = useState<IMovents>({
        id: crypto.randomUUID(),
        date: '',
        description: '',
        type: '',
        amount : 0,
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        try {
            setMovent((prev) => ({
                ...prev,
                [name] : Number(value) ? Number(value) : value
            }))
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        try {
            addMovents(movent)
            alert("Se agrego el movimiento")
            closeView()
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
                    <input type="date" name="date" required onChange={handleChange}/>

                    <label>Tipo</label>
                    <select name="type" onChange={handleChange} required>
                        <option disabled selected>Sin selección</option>
                        <option value="ingreso">Ingreso</option>
                        <option value="gasto">Gasto</option>
                    </select>

                    <label htmlFor="">Monto</label>
                    <input type="number" name="amount" required step={0.01} min={1} onChange={handleChange} />

                    <label htmlFor="">Descripción</label>
                    <textarea name="description" required onChange={handleChange}></textarea>

                    <div className={style.containerButtons}>
                        <button type='button' onClick={closeView}>Cerrar</button>
                        <button type='submit'>Crear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}