import React, { useEffect } from 'react';
function HeaderComponent() {
  useEffect(() => {
    document.title = 'LowNic Juegos';
  }, []);
  return (
    <header>
      <img id="logo" src='/logo.ico' alt="Logo" />
      <h1>LowNic Juegos</h1>
    </header>
  );
};

export default HeaderComponent;