import React from "react";
import { updateMatchState, deleteMatch } from "../../api/matchApi";
import "./Matches.css";

const Matches = ({ match, setMatches }) => {
  const handleMatchStateChange = async (newState) => {
    await updateMatchState(match.id, newState);
    setMatches((prevMatches) =>
      prevMatches.map((m) => (m.id === match.id ? { ...m, match_state: newState } : m))
    );
  };

  const handleDeleteMatch = async () => {
    await deleteMatch(match.id);
    setMatches((prevMatches) => prevMatches.filter((m) => m.id !== match.id));
  };

  return (
    <div className="match-card">
      <h3>📚 Intercambio de Libros</h3>
      
      <div className="book-details">
        <div className="book">
          <h4>Tu Libro</h4>
          <p><strong>Título:</strong> {match.book1?.title}</p>
          <p><strong>Autor:</strong> {match.book1?.author}</p>
          <p><strong>Estado:</strong> {match.book1?.book_state}</p>
          <p><em>📖 {match.book1?.type === "oferta" ? "Ofertado" : "Solicitado"} por {match.book1?.User?.name}</em></p>
        </div>
        
        <div className="book">
          <h4>Libro del Otro Usuario</h4>
          <p><strong>Título:</strong> {match.book2?.title}</p>
          <p><strong>Autor:</strong> {match.book2?.author}</p>
          <p><strong>Estado:</strong> {match.book2?.book_state}</p>
          <p><em>📖 {match.book2?.type === "oferta" ? "Ofertado" : "Solicitado"} por {match.book2?.User?.name}</em></p>
        </div>
      </div>

      <p className="match-status">
        <strong>Estado:</strong> 
        <span className={match.match_state === true ? "accepted" : match.match_state === false ? "rejected" : "pending"}>
          {match.match_state === true ? "✅ Aceptado" : match.match_state === false ? "❌ Rechazado" : "⏳ Pendiente"}
        </span>
      </p>

      <div className="match-actions">
        <button className="accept" onClick={() => handleMatchStateChange(true)}>✅ Aceptar</button>
        <button className="reject" onClick={() => handleMatchStateChange(false)}>❌ Rechazar</button>
        <button className="delete" onClick={handleDeleteMatch}>🗑️ Eliminar</button>
      </div>
    </div>
  );
};

export default Matches;
