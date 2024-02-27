import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const RegistrosPorAlimento = () => {
  const registros = useSelector((state) => state.alimentos.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  const prepareChartData = () => {
    const registrosPorAlimento = alimentos.map((alimento) => {
      const registrosDelAlimento = registros.filter((registro) => registro.idAlimento == alimento.id);
      return {
        alimento: alimento.nombre,
        cantidadRegistros: registrosDelAlimento.length,
      };
    });

    const chartData = {
      labels: registrosPorAlimento.map((registro) => registro.alimento),
      datasets: [
        {
          label: 'Cantidad de Registros',
          data: registrosPorAlimento.map((registro) => registro.cantidadRegistros),
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
      <h2>Registros por Alimento</h2>
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Registros por Alimento',
            },
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default RegistrosPorAlimento;
