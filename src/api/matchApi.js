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

export const updateMatchState = async (matchId, match_state) => {
  try {
    const response = await fetch(`${API_URL}/${matchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ match_state }),
    });
    if (!response.ok) throw new Error("Error al actualizar match");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
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
