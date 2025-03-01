import React from "react";
import "./Ofertas.css";
import { deleteOffer, updateOffer } from "../../api/bookApi";

const Ofertas = ({ ofertas, setOfertas }) => {
  // Función para eliminar una oferta
  const eliminarOferta = async (id) => {
    try {
      await deleteOffer(id); // Llama al endpoint DELETE en el backend
      // Actualiza el estado quitando la oferta eliminada
      setOfertas((prev) => prev.filter((offer) => offer.id !== id));
      alert("Oferta eliminada con éxito");
    } catch (error) {
      console.error("Error eliminando oferta:", error);
      alert("Error eliminando oferta");
    }
  };

  // Función para editar una oferta
  const editarOferta = async (offer) => {
    const nuevoTitulo = prompt("Editar título", offer.title);
    if (!nuevoTitulo || nuevoTitulo === offer.title) return;
    try {
      const ofertaActualizada = { id: offer.id, title: nuevoTitulo };
      await updateOffer(ofertaActualizada);
      setOfertas((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, title: nuevoTitulo } : o))
      );
      alert("Oferta actualizada con éxito");
    } catch (error) {
      console.error("Error editando oferta:", error);
      alert("Error editando oferta");
    }
  };
  

  return (
    <div className="ofertas-container">
      <div className="ofertas-grid ofertas-header">
        <div>Título</div>
        <div>Autor</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {ofertas.map((offer) => (
        <div key={offer.id} className="ofertas-grid ofertas-item">
          <div>{offer.title}</div>
          <div>{offer.author}</div>
          <div className={`estado ${offer.book_state.toLowerCase()}`}>
            {offer.book_state}
          </div>
          <div className="acciones">
            <button className="btn btn-primary" onClick={() => editarOferta(offer)}>
              ✏ Editar
            </button>
            <button className="btn btn-danger" onClick={() => eliminarOferta(offer.id)}>
              ❌ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ofertas;
