import { useState, type FC } from 'react'
import type { IMovents } from '../../types/IMovents'
import style from './DownloadMovent.module.css'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface IDownloadMovent {
    resume : IMovents[],
    balance: number,
    income: number,
    expense: number
}

export const DownloadMovent: FC<IDownloadMovent> = ({resume, balance, income, expense}) => {

    const [title, setTitle] = useState<string>('mensual')

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

    const month = resume[0].date.split('-')[1] // Mes

    // Funcion que creara el pedf
    const handleDownload = () => {
        const doc = new jsPDF()

        // Titulo
        doc.setFontSize(18)
        months.forEach((m) => m[1] === month && setTitle(m[0]))
        
        doc.text(`Resumen ${title}`, 10, 15)

        // Linea separadora
        doc.line(10, 18, 200, 18)

        // Encabezados de la tabla
        const head = [["Fecha", "Descripción", "Monto", "Tipo"]];

        const body = resume.map((movent) => [
            movent.date,
            movent.description,
            `$ ${movent.amount}`,
            movent.type === 'ingreso' ? "Ingreso" : "Gasto"
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