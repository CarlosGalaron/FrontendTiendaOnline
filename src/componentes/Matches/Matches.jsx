import React from 'react';
import './Matches.css'; // Importamos los estilos

const Matches = ({ match }) => {
  // Función vacía para el botón "ACEPTAR MATCH"
  const handleAceptarMatch = () => {
    console.log("Match aceptado:", match);
    // Aquí puedes añadir la lógica para aceptar el match
  };

  return (
    <div className="match-card">
      <div className="match-details">
        <h3>Tu oferta:</h3>
        <p><strong>Título:</strong> {match.mi_oferta.title}</p>
        <p><strong>Autor:</strong> {match.mi_oferta.author}</p>
        <p><strong>Tipo:</strong> {match.mi_oferta.type}</p>
        <p><strong>Estado:</strong> {match.mi_oferta.state}</p>

        <h3>Su oferta:</h3>
        <p><strong>Título:</strong> {match.su_oferta.title}</p>
        <p><strong>Autor:</strong> {match.su_oferta.author}</p>
        <p><strong>Tipo:</strong> {match.su_oferta.type}</p>
        <p><strong>Estado:</strong> {match.su_oferta.state}</p>
      </div>

      {/* Botón "ACEPTAR MATCH" */}
      <button className="aceptar-match-btn" onClick={handleAceptarMatch}>
        ACEPTAR MATCH
      </button>
    </div>
  );
};

export default Matches;