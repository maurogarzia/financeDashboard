import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts"
import useStoreMovents from "../../store/useStoreMovements"

const COLORS = ["#4caf50", "#f44336"] // Verde ingresos, rojo gastos


export const BalanceChart = () => {

    const {movents} = useStoreMovents()


    const totalIncome = movents.filter((m) => m.type === 'ingreso').reduce((acc, m) => acc + m.amount, 0)

    const totalExpenses = movents.filter((m) => m.type === 'gasto').reduce((acc, m) => acc + m.amount, 0)

    const data = [
        {name : "Ingresos", value: totalIncome},
        {name: "Gastos", value: totalExpenses}
    ]

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
            >
                {data.map((_,index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
            <Tooltip/>
            <Legend/>
        </PieChart>
        
    )
}