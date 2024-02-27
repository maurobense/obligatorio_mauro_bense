import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calcularCalorias } from '../redux/alimentosSlice';

const CaloriasDiarias = () => {
  const registros = useSelector((state) => state.alimentos.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  const calcularCaloriasAll = calcularCalorias;

  const [caloriasTotales, setCaloriasTotales] = useState(0);
  const caloriasDiariasPrevistas = parseFloat(localStorage.getItem('caloriasDiarias')) || 0;

  useEffect(() => {
    let total = 0;
    const currentDate = new Date();
    const registrosDiarios = registros.filter(r => r.fecha === currentDate.toISOString().split('T')[0]);
    registrosDiarios.forEach(r => {
      total += calcularCaloriasAll(r.cantidad, alimentos.find(a => a.id == r.idAlimento));
    });
    setCaloriasTotales(total);
  }, [registros]);

  const porcentajeDiferencia = ((caloriasTotales - caloriasDiariasPrevistas) / caloriasDiariasPrevistas) * 100;

  let color = '';
  if (caloriasTotales > caloriasDiariasPrevistas) {
    color = 'red';
  } else if (porcentajeDiferencia >= -10 && porcentajeDiferencia <= 0) {
    color = 'yellow';
  } else {
    color = 'green';
  }

  return (
    <>
      <h4>Calorias diarias</h4>
      <p style={{ color }}>{caloriasTotales}</p>
    </>
  );
};

export default CaloriasDiarias;
