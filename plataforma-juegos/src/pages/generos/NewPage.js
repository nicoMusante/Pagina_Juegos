import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BotonCrearComponent from '../../components/BotonCrearComponent';

function NewPage() {
  const navigate = useNavigate();
  const [nombreGen, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    if (nombreGen.trim() === '') {
      setMensaje('El nombre no puede estar vacío');
      return;
    }
    try {
      // Realizar la solicitud al endpoint para crear un nuevo género
      const response = await axios.post('http://localhost:8000/generos', {
        nombre: nombreGen
      });
      if (response.status === 200) {
        navigate('/generos?new=true');
      }else {
        setMensaje('Error al crear el género');
      }
    } catch (error) {
      console.error('Error al crear el género:', error);
      setMensaje('Error al crear el género');
    }
  };

  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  }

  return (
    <div>
      <h1>Nuevo Género</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChangeNombre} />
        <BotonCrearComponent text="Crear Género" to="/generos" />
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default NewPage;