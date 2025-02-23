import React, { useEffect, useState } from 'react';
import { getCompleteMatches } from '../../api/matchApi'; // Asegúrate de que esta función esté implementada
import Matches from '../Matches/Matches'; // Componente que muestra cada match
import './MisMatches.css';

const MisMatches = ({ userId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los matches completos al cargar el componente
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getCompleteMatches(userId); // Llama a la API para obtener los matches
        console.log("Respuesta de la API:", data); // Depuración

        // Verificar si la respuesta es un array
        if (Array.isArray(data)) {
          setMatches(data); // Guardar los matches en el estado
        } else {
          throw new Error("Formato de datos incorrecto: se esperaba un array");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener los matches:", err); // Depuración
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]); // Dependencia: userId

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mis-matches-container">
      <h1>Mis Matches</h1>
      <div className="matches-list">
        {matches.map((match) => (
          <Matches
            key={match.id} // Usar el ID del match como clave
            match={match}
            userId={userId} // Pasar userId al componente Matches
          />
        ))}
      </div>
    </div>
  );
};

export default MisMatches;