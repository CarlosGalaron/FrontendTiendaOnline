import React from "react";
import "./Ofertas.css";
// import IntercambioHome from "../../paginas/IntercambioHome/IntercambioHome";

const Ofertas = ({ ofertas, eliminarOferta, editarOferta }) => {
  return (
    <div className="ofertas-container">
      <div className="ofertas-grid ofertas-header">
        <div>Título</div>
        <div>Autor</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {ofertas.map((oferta) => (
        <div key={oferta.id} className="ofertas-grid ofertas-item">
          <div>{oferta.title}</div>
          <div>{oferta.author}</div>
          <div className={`estado ${oferta.book_state.toLowerCase()}`}>
            {oferta.book_state}
          </div>
          <div className="acciones">
            <button className="btn btn-primary" onClick={() => editarOferta(oferta)}>✏ Editar</button>
            <button className="btn btn-danger" onClick={() => eliminarOferta(oferta.id)}>❌ Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ofertas;
