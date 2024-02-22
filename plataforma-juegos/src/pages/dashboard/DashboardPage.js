import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OptionComponent from '../../components/OpcionComponent';
function DashboardPage() {
  const [juegos, setJuegos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [generos, setGeneros] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState('');
  const [plataformas, setPlataformas] = useState([]);
  const [filtroPlataforma, setFiltroPlataforma] = useState('');
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    obtenerJuegos();
    obtenerGeneros();
    obtenerPlataformas();
  }, []);

  const obtenerJuegos = async () => {
    try {
      const url = `http://localhost:8000/juegos?nombre=${filtroNombre}&genero=${filtroGenero}&plataforma=${filtroPlataforma}&orden=${ordenAscendente ? 'ASC' : 'DESC'}`;
      const response = await axios.get(url);
      setJuegos(response.data);
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
    }
  };

  const obtenerGeneros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generos');
      const generosNombres = Array(response.data.length);
      response.data.forEach((genero) => {
        generosNombres[genero.id] = genero.nombre;
      });
      setGeneros(generosNombres);
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };

  const obtenerPlataformas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/plataformas');
      const plataformasNombres = Array(response.data.length);
      response.data.forEach((plataforma) => {
        plataformasNombres[plataforma.id] = plataforma.nombre;
      });
      setPlataformas(plataformasNombres);
    } catch (error) {
      console.error('Error al obtener las plataformas:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form id= "Filtro-juego">
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          placeholder="Filtrar por nombre"
        />
        <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
        <OptionComponent value="" label="Seleccione un género" selected={filtroGenero === ""} />
          {generos.map((nombreGenero, index) => (
            <OptionComponent
              key={index}
              value={index}
              label={nombreGenero}
              selected={filtroGenero === index}
            />
          ))}
        </select>
        <select value={filtroPlataforma} onChange={(e) => setFiltroPlataforma(e.target.value)}>
        <OptionComponent value="" label="Seleccione una plataforma" selected={filtroPlataforma === ""} />
          {plataformas.map((nombrePlataforma, index) => (
            <OptionComponent
              key={index}
              value={index}
              label={nombrePlataforma}
              selected={filtroPlataforma === index}
            />
          ))}
        </select>
        <label>
          Orden ascendente
          <input
            type="checkbox"
            checked={ordenAscendente}
            onChange={() => setOrdenAscendente(!ordenAscendente)}
          />
        </label>
        <button type="button" id="botonFiltrar" onClick={obtenerJuegos}>
          Filtrar
        </button>
      </form>
      {Array.isArray(juegos) && juegos.length > 0 ? (
        <ul id="listaJuegos">
          {juegos.map((juego) => (
            <li key={juego.id} className="elemJuego">
              <h3>{juego.nombre}</h3>
              <img
                className="elemImage"
                src={`data:${juego.tipo_imagen};base64,${juego.imagen}`}
                alt="imagen"
              />
              <p className="descripcion">{juego.descripcion}</p>
              <p className="plataforma">{plataformas[juego.id_plataforma]}</p>
              <p className="genero">{generos[juego.id_genero]}</p>
              <a href={juego.url}>Click aquí</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>{juegos}</p>
      )}
    </div>
  );
}

export default DashboardPage;

