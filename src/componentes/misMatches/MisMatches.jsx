import React, { useEffect, useState } from "react";
import { getUserMatches } from "../../api/matchApi";
import MatchCard from "../Matches/Matches";
import "./MisMatches.css";

const MisMatches = () => {
  const [matches, setMatches] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  const fetchMatches = async () => {
    const data = await getUserMatches(userId);
    console.log("Matches recibidos:", data);
    setMatches(data);
  };

  return (
    <div>
      <h2>Mis Matches</h2>
      {matches.length > 0 ? (
        matches.map((match) => (
          <MatchCard key={match.id} match={match} setMatches={setMatches} />
        ))
      ) : (
        <p>No tienes matches aún.</p>
      )}
    </div>
  );
};

export default MisMatches;
