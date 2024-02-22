import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BotonEliminarComponent from '../../components/BotonEliminarComponent';
import BotonEditarComponent from '../../components/BotonEditarComponent';
import BotonAceptarComponent from '../../components/BotonAceptarComponent';
import BotonCancelarComponent from '../../components/BotonCancelarComponent';
import PageHeaderComponent from '../../components/PageHeaderComponent';

function PlataformasPage() {
  const location = useLocation();
  const [plataformas, setPlataformas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [confirmacion, setConfirmacion] = useState(false);
  const [id_eliminar, setId_eliminar] = useState('');

  useEffect(() => {
    obtenerPlataformas();
    handleEdit();
    handleNew();
  }, []);

  const handleNew = async () => {
    if (location.search.includes('new=true')) {
      setMensaje('Plataforma creada correctamente');
    }
  };

  const handleEdit = async () => {
    if (location.search.includes('edit=true')) {
      setMensaje('Plataforma editada correctamente');
    }
  };

  const obtenerPlataformas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/plataformas');
      setPlataformas(response.data);
    } catch (error) {
      console.error('Error al obtener las plataformas:', error);
    }
  };

  const eliminarPlataforma = (id) => {
    setId_eliminar(id);
    setConfirmacion(true);
  };

  const confirmarEliminarPlataforma = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/plataformas?id=${id}`);
      if (response.status === 200) {
        setMensaje(response.data);
        setPlataformas(prevPlataformas => prevPlataformas.filter(plataforma => plataforma.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar la plataforma:', error);
      setMensaje('No puede eliminarse por dependencias de la base de datos');
    }
    setConfirmacion(false);
  };

  const cancelarEliminarPlataforma = () => {
    setConfirmacion(false);
  };

  return (
    <div>
      <PageHeaderComponent title="Plataformas" newLink="/plataformas/new" />
      {mensaje && <p>{mensaje}</p>}
      {confirmacion && (
        <div style={{ marginTop: '20px' }}>
          <p>¿Está seguro que desea eliminarla?</p>
          <BotonAceptarComponent onClick={() => confirmarEliminarPlataforma(id_eliminar)} />
          <BotonCancelarComponent onClick={cancelarEliminarPlataforma} />
          </div>
        )}
        {Array.isArray(plataformas) && plataformas.length > 0 ? (
          <ul>
            {plataformas.map((plataforma) => (
              <div key={plataforma.id} style={{ marginBottom: '10px' }}>
                <li>{plataforma.nombre}</li>
                <BotonEditarComponent url={`/plataformas/edit/${plataforma.id}/${plataforma.nombre}`} />
                <BotonEliminarComponent onClick={() => eliminarPlataforma(plataforma.id)} />

              </div>
            ))}
          </ul>
        ) : (
          <p>{plataformas}</p>
        )}
      </div>
    );
  }
  
  export default PlataformasPage;
  