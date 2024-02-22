import React from 'react';
import { Link } from 'react-router-dom';

function NavBarComponent() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li style={styles.li}>
          <Link to="/generos" style={styles.link}>
            Géneros
          </Link>
        </li>
        <li style={styles.li}>
          <Link to="/plataformas" style={styles.link}>
            Plataformas
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#aaaaaa',
    padding: '10px',
    marginBottom: '20px',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  li: {
    margin: '0 10px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
  },
};

export default NavBarComponent;
