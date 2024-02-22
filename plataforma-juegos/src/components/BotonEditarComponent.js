import React from 'react';

function BotonEditarComponent({ url }) {
  return (
    <a href={url}>
      <button
        style={{
          backgroundColor: '#f5f5f5',
          border: '1px solid #ccc',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Editar
      </button>
    </a>
  );
}

export default BotonEditarComponent;
