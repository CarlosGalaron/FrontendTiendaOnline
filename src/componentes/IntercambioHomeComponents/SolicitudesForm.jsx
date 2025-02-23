// src/componentes/SolicitudesForm/SolicitudesForm.jsx
import React from 'react';
import './SolicitudesForm.css';

const SolicitudesForm = ({ requestData, handleInputChange, handleCreateRequest }) => {
  return (
    <div className="solicitudes-form-container">
      <form className="form-solicitud" onSubmit={handleCreateRequest}>
        <label>Título</label>
        <input
          type="text"
          name="title"
          placeholder="Don Quijote de la Mancha"
          value={requestData.title}
          onChange={(e) => handleInputChange(e, "request")}
        />
        <label>Autor</label>
        <input
          type="text"
          name="author"
          placeholder="Miguel de Cervantes"
          value={requestData.author}
          onChange={(e) => handleInputChange(e, "request")}
        />
        <label>Estado del libro</label>
        <select
          name="book_state"
          value={requestData.book_state}
          onChange={(e) => handleInputChange(e, "request")}
        >
          <option value="">Selecciona el estado</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Seminuevo">Seminuevo</option>
          <option value="Deteriorado">Deteriorado</option>
        </select>
        <button className="form-button" type="submit">Crear solicitud</button>
      </form>
    </div>
  );
};

export default SolicitudesForm;
