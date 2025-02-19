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
      <h3>Intercambio:</h3>
      <p><strong>Tu libro:</strong> {match.book1_id}</p>
      <p><strong>Libro del otro usuario:</strong> {match.book2_id}</p>
      <p><strong>Estado:</strong> {match.match_state === true ? "Aceptado" : match.match_state === false ? "Rechazado" : "Pendiente"}</p>

      <button onClick={() => handleMatchStateChange(true)}>Aceptar</button>
      <button onClick={() => handleMatchStateChange(false)}>Rechazar</button>
      <button onClick={handleDeleteMatch}>Eliminar</button>
    </div>
  );
};

export default Matches;
