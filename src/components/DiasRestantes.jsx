import React, { useEffect, useState } from 'react';

const DiasRestantes = () => {
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    const fechaObjetivo = new Date('2024-03-31');
    const fechaActual = new Date();
    
    const diferenciaEnMilisegundos = fechaObjetivo - fechaActual;
    
    const diasRestantes = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    setDiasRestantes(diasRestantes);
  }, []);

  return (
    <div>
      <h4>Tiempo restante</h4>
      <p>{diasRestantes} días</p>
    </div>
  );
}

export default DiasRestantes;
