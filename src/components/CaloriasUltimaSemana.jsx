import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { calcularCalorias } from '../redux/alimentosSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
);

const CaloriasUltimaSemana = () => {
    const registros = useSelector((state) => state.alimentos.registros);
    const alimentos = useSelector((state) => state.alimentos.alimentos);

    const prepareChartData = () => {
        const currentDate = new Date();
        const lastWeekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            return date.toISOString().split('T')[0];
        });

        const caloriesByDate = lastWeekDates.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        registros.forEach((registro) => {
            const alimento = alimentos.find((a) => a.id == registro.idAlimento);
            const calories = calcularCalorias(registro.cantidad, alimento);
            caloriesByDate[registro.fecha] += calories;
        });

        const chartData = {
            labels: Object.keys(caloriesByDate),
            datasets: [
                {
                    label: 'Calorías',
                    data: Object.values(caloriesByDate),
                    backgroundColor: 'wheat',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1,
                },
            ],
        };

        return chartData;
    };

    const [chartData, setChartData] = useState(prepareChartData());

    useEffect(() => {
        setChartData(prepareChartData());
    }, [registros, alimentos]);

    return (
        <div>
            <h2>Calorías Última Semana</h2>
            <Bar
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Calorías Última Semana',
                        },
                    },
                }}
                data={chartData}
            />
        </div>
    );
};

export default CaloriasUltimaSemana;
