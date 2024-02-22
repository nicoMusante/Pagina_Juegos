import './assets/estilos.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import GenerosPage from './pages/generos/GenerosPage';
import NewGeneroPage from './pages/generos/NewPage';
import EditGeneroPage from './pages/generos/EditPage';
import PlataformasPage from './pages/plataformas/PlataformasPage';
import NewPlataformaPage from './pages/plataformas/NewPage';
import EditPlataformaPage from './pages/plataformas/EditPage';
import DashboardPage from './pages/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <HeaderComponent />
        <NavBarComponent />
        <div className="content">
          <Routes>
            <Route exact path="/generos" element={<GenerosPage />} />
            <Route exact path="/generos/new" element={<NewGeneroPage />} />
            <Route
              exact
              path="/generos/edit/:id/:nombre"
              element={<EditGeneroPage />}
            />
            <Route exact path="/plataformas" element={<PlataformasPage />} />
            <Route
              exact
              path="/plataformas/new"
              element={<NewPlataformaPage />}
            />
            <Route
              exact
              path="/plataformas/edit/:id/:nombre"
              element={<EditPlataformaPage />}
            />
            <Route exact path="/" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;