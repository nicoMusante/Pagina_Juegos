import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
  const { id, nombre } = useParams();
  const navigate = useNavigate();
  const [inputNombre, setInputNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputNombre.trim() === '') {
      setMensaje('El nombre no puede estar vacío');
      return;
    }
    if (inputNombre === nombre){
      setMensaje('No se ha modificado el nombre');
      return;
    }
    try {
      // Realizar la solicitud al endpoint para editar el género
      const response = await axios.put(`http://localhost:8000/generos?id=${id}`, {  
        nombre: inputNombre 
      });
      if (response.status === 200) {
        navigate('/generos?edit=true');
      }else {
        setMensaje('Error al editar el genero');
      }
    } catch (error) {
      console.error('Error al editar el género:', error);
      setMensaje('Error al editar el género');
    }
  };

  useEffect(() => {
    setInputNombre(nombre);
  }, [nombre]);

  const handleInputChange = (event) => {
    setInputNombre(event.target.value);
  };

  return (
    <div>
      <h1>Editar Género</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputNombre} onChange={handleInputChange} />
        <button type="submit">Guardar Cambios</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EditPage;