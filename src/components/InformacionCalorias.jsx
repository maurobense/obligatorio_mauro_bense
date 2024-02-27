import React from 'react'
import CaloriasTotales from './CaloriasTotales'
import CaloriasDiarias from './CaloriasDiarias'
import DiasRestantes from './DiasRestantes'

const InformacionCalorias = () => {
  return (
    <>
    <div className='row informe-calorias-container'>
    <div className='col-4'><CaloriasTotales/></div>
    <div className='col-4'><CaloriasDiarias/></div>
    <div className='col-4'><DiasRestantes/></div>
    </div>
    </>
  )
}

export default InformacionCalorias