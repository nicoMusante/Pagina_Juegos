import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BotonCrearComponent from '../../components/BotonCrearComponent';


function NewPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nombre.trim() === '') {
      setMensaje('El nombre no puede estar vacío');
      return;
    }
    try {
      // Realizar la solicitud al endpoint para crear una nueva plataforma
      const response = await axios.post('http://localhost:8000/plataformas', {
         nombre: nombre 
      });
      if (response.status === 200) {
        navigate('/plataformas?new=true');
      }else {
        setMensaje('Error al crear la plataforma');
      }
    } catch (error) {
      console.error('Error al crear la plataforma:', error);
      setMensaje('Error al crear la plataforma');
    }
  };

  return (
    <div>
      <h1>Nueva Plataforma</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <BotonCrearComponent type="submit" text="Crear Plataforma" to="/plataformas" />
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default NewPage;
