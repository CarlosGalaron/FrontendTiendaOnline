import React from "react";
import "./Solicitudes.css";
import { deleteRequest, updateRequest } from "../../api/bookApi";

const Solicitudes = ({ solicitudes, setSolicitudes }) => {
  // Función para eliminar una solicitud
  const eliminarSolicitud = async (id) => {
    try {
      await deleteRequest(id);
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
      alert("Solicitud eliminada con éxito");
    } catch (error) {
      console.error("Error eliminando solicitud:", error);
      alert("Error eliminando solicitud");
    }
  };

  // Función para editar una solicitud
  const editarSolicitud = async (solicitud) => {
    const nuevoTitulo = prompt("Editar título", solicitud.title);
    if (!nuevoTitulo || nuevoTitulo === solicitud.title) return;
    try {
      const solicitudActualizada = { id: solicitud.id, title: nuevoTitulo };
      await updateRequest(solicitudActualizada);
      setSolicitudes((prev) =>
        prev.map((s) => (s.id === solicitud.id ? { ...s, title: nuevoTitulo } : s))
      );
      alert("Solicitud actualizada con éxito");
    } catch (error) {
      console.error("Error editando solicitud:", error);
      alert("Error editando solicitud");
    }
  };

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
            <button className="btn btn-primary" onClick={() => editarSolicitud(solicitud)}>
              ✏ Editar
            </button>
            <button className="btn btn-danger" onClick={() => eliminarSolicitud(solicitud.id)}>
              ❌ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Solicitudes;
