import React, { useState } from "react";
import "./Solicitudes.css"; // Asegúrate de crear este archivo de estilos

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, titulo: "Libro X", autor: "Autor A", estado: "Pendiente" },
    { id: 2, titulo: "Libro Y", autor: "Autor B", estado: "Aprobado" },
    { id: 3, titulo: "Libro Z", autor: "Autor C", estado: "Rechazado" },
  ]);

  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const editarSolicitud = (solicitud) => {
    console.log("Editar solicitud", solicitud);
    setSolicitudSeleccionada(solicitud);
  };

  const eliminarSolicitud = (id) => {
    console.log("Eliminar solicitud con ID:", id);
    setSolicitudes(solicitudes.filter((s) => s.id !== id));
    if (solicitudSeleccionada?.id === id) {
      setSolicitudSeleccionada(null);
    }
  };

  return (
    <div className="solicitudes-container">
      {/* Encabezado */}
      <div className="solicitudes-grid solicitudes-header">
        <div>Título</div>
        <div>Autor</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {/* Lista de solicitudes */}
      {solicitudes.map((solicitud) => (
        <div key={solicitud.id} className="solicitudes-grid solicitudes-item">
          <div>{solicitud.titulo}</div>
          <div>{solicitud.autor}</div>
          <div className={`estado ${solicitud.estado.toLowerCase()}`}>
            {solicitud.estado}
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
