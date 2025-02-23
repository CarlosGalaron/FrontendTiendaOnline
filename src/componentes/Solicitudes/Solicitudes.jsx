import React from "react";
import "./Solicitudes.css";
// import IntercambioHome from "../../paginas/IntercambioHome/IntercambioHome";

const Solicitudes = ({ solicitudes, eliminarSolicitud, editarSolicitud }) => {
  return (
    <div className="solicitudes-container">
      <div className="solicitudes-grid solicitudes-header">
        <div>Título</div>
        <div>Autor</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {solicitudes.map((solicitud) => (
        <div key={solicitud.id} className="solicitudes-grid solicitudes-item">
          <div>{solicitud.title}</div>
          <div>{solicitud.author}</div>
          <div className={`estado ${solicitud.book_state.toLowerCase()}`}>
            {solicitud.book_state}
          </div>
          <div className="acciones">
            <button className="btn btn-primary" onClick={() => editarSolicitud(solicitud)}>✏ Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarSolicitud(solicitud.id)}>❌ Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Solicitudes;