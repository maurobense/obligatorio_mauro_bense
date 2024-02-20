import React from 'react'
import { BarraNavegacion } from './BarraNavegacion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.apiKey){
            navigate('/Login');
        }
    }, [])
    
  return (
    <BarraNavegacion/>
  )
}
