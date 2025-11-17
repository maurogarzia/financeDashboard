import { type FC } from 'react'

import style from './DownloadMovent.module.css'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { IMovements } from '../../types/IMovements'

interface IDownloadMovent {
    resume : IMovements[],
    balance: number,
    income: number,
    expense: number,
    year: number
}

export const DownloadMovent: FC<IDownloadMovent> = ({resume, balance, income, expense, year}) => {

    

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

    const month = String(resume[0].date).split('-')[1] // Mes

    // Funcion que creara el pedf
    const handleDownload = () => {
        const doc = new jsPDF()

        // Nombre del mes que corresponde al PDF actual
        const monthName = months.find(m => m[1] === month)?.[0] || "mensual";

        // Titulo
        
        doc.setFontSize(18)
        
        doc.text(`Resumen ${monthName} ${year}`, 10, 15)

        // Linea separadora
        doc.line(10, 18, 200, 18)

        // Encabezados de la tabla
        const head = [["Fecha", "Descripción", "Monto", "Tipo"]];

        const body = resume.map((movent) => [
            String(movent.date).split('T')[0],
            movent.description,
            `$ ${movent.amount}`,
            movent.type === 'income' ? "Ingreso" : "Gasto"
        ])

        // Genero tabla
        autoTable(doc, {
            startY: 30,
            head,
            body,
            theme: "striped",
            headStyles: { fillColor: [40, 116, 240] }, // color del encabezado
            bodyStyles : {textColor: 50},
            styles: { halign: "center"} // centrado de texto
        })

        const finalY = (doc as any).lastAutoTable.finalY || 30;


        // Balance, gastos e ingresos
        doc.setFontSize(10)
        doc.text(`Ingresos: $${income}`, 14, finalY + 10);
        doc.text(`Gastos: $${expense}`, 14, finalY + 20);
        doc.text(`Balance: $${balance}`, 14, finalY + 30);


        // Descargar
        
        doc.save(`resumen_mes_${month}.pdf`)

    }


    return (
        <button className={style.containerButtons} onClick={handleDownload}>
            Descargar resumen
        </button>
    )
}