import React from 'react';

function BotonEliminarComponent({ onClick }) {
  return (
    <button
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      Eliminar
    </button>
  );
}

export default BotonEliminarComponent;