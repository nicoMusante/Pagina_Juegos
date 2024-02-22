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
    if (inputNombre === nombre) {
      setMensaje('No se ha modificado el nombre');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8000/plataformas?id=${id}`, {
        nombre: inputNombre,
      });
      if (response.status === 200) {
        navigate('/plataformas?edit=true');
      } else {
        setMensaje('Error al editar la plataforma');
      }
    } catch (error) {
      console.error('Error al editar la plataforma:', error);
      setMensaje('Error al editar la plataforma');
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
      <h1 style={{ marginBottom: '20px' }}>Editar Plataforma</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputNombre}
          onChange={handleInputChange}
          style={{
            marginBottom: '10px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Guardar Cambios
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default EditPage;
