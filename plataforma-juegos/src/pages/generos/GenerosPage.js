import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BotonEliminarComponent from '../../components/BotonEliminarComponent';
import BotonEditarComponent from '../../components/BotonEditarComponent';
import BotonAceptarComponent from '../../components/BotonAceptarComponent';
import BotonCancelarComponent from '../../components/BotonCancelarComponent';
import PageHeaderComponent from '../../components/PageHeaderComponent';

function GenerosPage() {
  const location = useLocation();
  const [generos, setGeneros] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [confirmacion, setConfirmacion] = useState(false);
  const [id_eliminar, setId_eliminar] = useState('');

  useEffect(() => {
    obtenerGeneros();
    handleEdit();
    handleNew();
  }, []);

  const handleNew = async () => {
    if (location.search.includes('new=true')) {
      setMensaje('Género creado correctamente');
    }
  };

  const handleEdit = async () => {
    if (location.search.includes('edit=true')) {
      setMensaje('Género editado correctamente');
    }
  };

  const obtenerGeneros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generos');
      setGeneros(response.data);
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };

  const eliminarGenero = (id) => {
    setId_eliminar(id);
    setConfirmacion(true);
  };

  const confirmarEliminarGenero = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/generos?id=${id}`);
      if (response.status === 200) {
        setMensaje(response.data);
        setGeneros(prevGeneros => prevGeneros.filter(genero => genero.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar el género:', error);
      setMensaje('No puede eliminarse por dependencias de la base de datos');
    }
    setConfirmacion(false);
  };

  const cancelarEliminarGenero = () => {
    setConfirmacion(false);
  };

  return (
    <div>
      <PageHeaderComponent title="Géneros" newLink="/generos/new" />
      {mensaje && <p>{mensaje}</p>}
      {confirmacion && (
        <div style={{ marginTop: '20px' }}>
          <p>¿Está seguro que desea eliminarlo?</p>
          <BotonAceptarComponent onClick={() => confirmarEliminarGenero(id_eliminar)} />
          <BotonCancelarComponent onClick={cancelarEliminarGenero} />
        </div>
      )}
            {Array.isArray(generos) && generos.length > 0 ? (
        <ul>
          {generos.map((genero) => (
            <div key={genero.id} style={{ marginBottom: '10px' }}>
              <li>{genero.nombre}</li>
              <BotonEditarComponent url={`/generos/edit/${genero.id}/${genero.nombre}`} />
              <BotonEliminarComponent onClick={() => eliminarGenero(genero.id)} />
            </div>
          ))}
        </ul>
      ) : (
        <p>{generos}</p>
      )}
    </div>
  );
}

export default GenerosPage;
