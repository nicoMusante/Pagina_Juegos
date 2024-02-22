import React from 'react';
import PropTypes from 'prop-types';

function BotonAceptarComponent({ onClick }) {
  return (
    <button
      style={{
        marginRight: '10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      Aceptar
    </button>
  );
}

BotonAceptarComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BotonAceptarComponent;
