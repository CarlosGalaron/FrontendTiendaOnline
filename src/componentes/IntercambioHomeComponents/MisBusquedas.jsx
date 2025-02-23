import React from 'react';
import Ofertas from '../Ofertas/Ofertas';       
import Solicitudes from '../Solicitudes/Solicitudes';
import './MisBusquedas.css';

const MisBusquedas = ({ mostrarOfertas, toggleBusqueda, loading, ofertas, solicitudes, setOfertas, setSolicitudes }) => {

  return (
    <div className="mis-busquedas-container">
      <button className="busqueda-toggle-button" onClick={toggleBusqueda}>
        {mostrarOfertas ? 'Ver Solicitudes' : 'Ver Ofertas'}
      </button>
      <div className="busqueda-list-container">
        {loading ? (
          <p>Cargando...</p>
        ) : mostrarOfertas ? (
          <Ofertas ofertas={ofertas} setOfertas={setOfertas} />
        ) : (
          <Solicitudes solicitudes={solicitudes} setSolicitudes={setSolicitudes} />
        )}
      </div>
    </div>
  );
};

export default MisBusquedas;
