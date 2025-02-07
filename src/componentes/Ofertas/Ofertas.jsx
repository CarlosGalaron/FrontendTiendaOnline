import React, { useState } from "react";
import "./Ofertas.css"; // Asegúrate de crear este archivo de estilos

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([
    { id: 1, titulo: "Libro A", autor: "Autor 1", estado: "Pendiente" },
    { id: 2, titulo: "Libro B", autor: "Autor 2", estado: "Aprobado" },
    { id: 3, titulo: "Libro C", autor: "Autor 3", estado: "Rechazado" },
  ]);

  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);

  const editarOferta = (oferta) => {
    console.log("Editar oferta", oferta);
    setOfertaSeleccionada(oferta);
  };

  const eliminarOferta = (id) => {
    console.log("Eliminar oferta con ID:", id);
    setOfertas(ofertas.filter((s) => s.id !== id));
    if (ofertaSeleccionada?.id === id) {
      setOfertaSeleccionada(null);
    }
  };

  return (
    <div className="ofertas-container">
      {/* Encabezado */}
      <div className="ofertas-grid ofertas-header">
        <div>Título</div>
        <div>Autor</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {/* Lista de ofertas */}
      {ofertas.map((oferta) => (
        <div key={oferta.id} className="ofertas-grid ofertas-item">
          <div>{oferta.titulo}</div>
          <div>{oferta.autor}</div>
          <div className={`estado ${oferta.estado.toLowerCase()}`}>
            {oferta.estado}
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
