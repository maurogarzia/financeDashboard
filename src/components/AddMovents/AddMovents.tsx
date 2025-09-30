import style from './AddMovents.module.css'

export const AddMovents = () => {
    return (
        <div className={style.containerPrincipal}>
            <h1>Ingresar nuevo movimiento</h1>

            <div className={style.contanierData}>
                <form className={style.form}>
                    <label htmlFor="">Fecha</label>
                    <input type="date" name="date" />

                    <label htmlFor="">Tipo</label>
                    <select name="type" id="">
                        <option disabled selected>Sin selección</option>
                        <option value="">Ingreso</option>
                        <option value="">Gasto</option>
                    </select>

                    <label htmlFor="">Monto</label>
                    <input type="number" name="amount" id="" />

                    <label htmlFor="">Descripción</label>
                    <textarea name="description" ></textarea>
                </form>
            </div>
        </div>
    )
}