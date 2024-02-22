import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function BotonCrearComponent({ text, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button type="submit" className="create-button" onClick={to}
      style={{
        backgroundColor: '#green',
        border: '1px solid #ccc',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
    
  );
}

BotonCrearComponent.propTypes = {
    text: PropTypes.string.isRequired,
  };

export default BotonCrearComponent;
