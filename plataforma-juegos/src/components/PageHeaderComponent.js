import React from 'react';
import PropTypes from 'prop-types';

function PageHeaderComponent({ title, newLink }) {
  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>{title}</h1>
      <a
        href={newLink}
        style={{
          marginBottom: '10px',
          display: 'block',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ccc',
          padding: '5px 10px',
          borderRadius: '4px',
          textDecoration: 'none',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Nuevo
      </a>
    </div>
  );
}

PageHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  newLink: PropTypes.string.isRequired,
};

export default PageHeaderComponent;