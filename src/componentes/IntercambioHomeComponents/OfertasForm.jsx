// src/componentes/OfertasForm/OfertasForm.jsx
import React from 'react';
import './OfertasForm.css';

const OfertasForm = ({ offerData, handleInputChange, handleCreateOffer }) => {
  return (
    <div className="ofertas-form-container">
      <form className="form-oferta" onSubmit={handleCreateOffer}>
        <label>Título</label>
        <input
          type="text"
          name="title"
          placeholder="Don Quijote de la Mancha"
          value={offerData.title}
          onChange={(e) => handleInputChange(e, "offer")}
        />
        <label>Autor</label>
        <input
          type="text"
          name="author"
          placeholder="Miguel de Cervantes"
          value={offerData.author}
          onChange={(e) => handleInputChange(e, "offer")}
        />
        <label>Estado del libro</label>
        <select
          name="book_state"
          value={offerData.book_state}
          onChange={(e) => handleInputChange(e, "offer")}
        >
          <option value="">Selecciona el estado</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Seminuevo">Seminuevo</option>
          <option value="Deteriorado">Deteriorado</option>
        </select>
        <button className="form-button" type="submit">Crear oferta</button>
      </form>
    </div>
  );
};

export default OfertasForm;
