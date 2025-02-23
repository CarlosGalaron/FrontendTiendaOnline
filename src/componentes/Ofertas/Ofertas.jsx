import React from "react";
import "./Ofertas.css";
import { deleteOffer, updateOffer } from "../../api/bookApi";

const Ofertas = ({ ofertas, setOfertas }) => {
  // Función para eliminar una oferta
  const eliminarOferta = async (id) => {
    try {
      await deleteOffer(id); // Llama al endpoint DELETE en el backend
      // Actualiza el estado quitando la oferta eliminada
      setOfertas((prev) => prev.filter((oferta) => oferta.id !== id));
      alert("Oferta eliminada con éxito");
    } catch (error) {
      console.error("Error eliminando oferta:", error);
      alert("Error eliminando oferta");
    }
  };

  // Función para editar una oferta
  const editarOferta = async (oferta) => {
    // Abrir un prompt para editar el título
    const nuevoTitulo = prompt("Editar título", oferta.title);
    if (!nuevoTitulo || nuevoTitulo === oferta.title) return;
    try {
      const ofertaActualizada = { ...oferta, title: nuevoTitulo };
      await updateOffer(ofertaActualizada); // Llama al endpoint PUT en el backend
      // Actualiza el estado reemplazando la oferta editada
      setOfertas((prev) =>
        prev.map((o) => (o.id === oferta.id ? ofertaActualizada : o))
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

      {ofertas.map((oferta) => (
        <div key={oferta.id} className="ofertas-grid ofertas-item">
          <div>{oferta.title}</div>
          <div>{oferta.author}</div>
          <div className={`estado ${oferta.book_state.toLowerCase()}`}>
            {oferta.book_state}
          </div>
          <div className="acciones">
            <button className="btn btn-primary" onClick={() => editarOferta(oferta)}>
              ✏ Editar
            </button>
            <button className="btn btn-danger" onClick={() => eliminarOferta(oferta.id)}>
              ❌ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ofertas;
