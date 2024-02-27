import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calcularCalorias } from '../redux/alimentosSlice';


const CaloriasTotales = () => {
  const registros = useSelector((state) => state.alimentos.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);
    
  const calcularCaloriasAll = calcularCalorias;

  const [caloriasTotales, setCaloriasTotales] = useState(0);

  useEffect(() => {
    let total = 0;
    registros.forEach(r => {
      total += calcularCaloriasAll(r.cantidad, alimentos.find(a => a.id == r.idAlimento))
    });
    setCaloriasTotales(total);
  }, [registros]);

  return (
    <>
      <h4>Calorias totales</h4>
      <p>{caloriasTotales}</p>
    </>
  );
};

export default CaloriasTotales;
