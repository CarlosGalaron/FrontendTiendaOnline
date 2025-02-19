import React, { useEffect, useState } from "react";
import { getUserMatches } from "../../api/matchApi";
import Matches from "../Matches/Matches";
import "./MisMatches.css";

const MisMatches = () => {

  const [matches, setMatches] = useState([]);
  // Obtener el ID del usuario autenticado desde localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")); // Asegurar que se parsea bien
  const userId = storedUser?.id; // Evitar errores si no existe

  useEffect(() => {
    if (userId) {
      getUserMatches(userId).then((data) => {
        console.log("Matches recibidos:", data); // Verifica si hay `id`);
        setMatches(data);
      });
    }
  }, [userId]);

  return (
    <div>
      <h2>Mis Matches</h2>
      {matches.length > 0 ? (
        matches.map((match) => (
          <Matches key={match.id} match={match} setMatches={setMatches} />
        ))
      ) : (
        <p>No tienes matches aún.</p>
      )}
    </div>
  );
};

export default MisMatches;
