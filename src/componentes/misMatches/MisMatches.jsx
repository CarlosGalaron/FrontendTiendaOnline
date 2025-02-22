// src/components/MisMatches/MisMatches.jsx
import React, { useEffect, useState } from 'react';
import { getCompleteMatches } from '../../api/matchApi';
import Matches from '../Matches/Matches';
import './MisMatches.css';

const MisMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los matches completos al cargar el componente
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getCompleteMatches();
        console.log("Respuesta de la API:", data); // Depuración
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Verificar que matches sea un array antes de usar .map()
  if (!Array.isArray(matches)) {
    console.error("matches no es un array:", matches);
    return <p>Error: Formato de datos incorrecto</p>;
  }

  return (
    <div className="mis-matches-container">
      <h1>Mis Matches</h1>
      <div className="matches-list">
        {matches.map((match) => (
          <Matches key={match.match_id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MisMatches;