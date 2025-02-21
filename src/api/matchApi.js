const API_URL = "http://localhost:4000/api/matches"; // Ajusta según tu configuración

export const getUserMatches = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error("Error al obtener matches");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updateMatchState = async (matchId, userId, matchState) => {
  const response = await fetch(`/api/matches/${matchId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, match_state: matchState }),
  });

  if (!response.ok) {
    throw new Error("Error actualizando el estado del match");
  }

  return await response.json();
};

export default {
  updateMatchState,
};

export const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(`${API_URL}/${matchId}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar match");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

