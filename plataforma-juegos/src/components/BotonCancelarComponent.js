import React from 'react';
import PropTypes from 'prop-types';

function BotonCancelarComponent({ onClick }) {
  return (
    <button
      style={{
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      Cancelar
    </button>
  );
}

BotonCancelarComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BotonCancelarComponent;