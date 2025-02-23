// src/api/matchApi.js

// Obtener el ID del usuario autenticado desde localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.id;

const baseURL = 'http://localhost:4000/api/matches'; // URL de las rutas en matchRouter.js

/**
 * Obtener los matches completos del usuario logueado
 */
export const getCompleteMatches = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    const response = await fetch(`${baseURL}/complete-matches?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json(); // Respuesta completa
    return result.data; // Devuelve solo el array de matches
  } catch (error) {
    console.error("Error obteniendo matches completos:", error);
    throw error;
  }
};

/**
 * Actualizar el estado de un match
 */
export const updateMatchState = async (matchId, matchState) => {
  try {
    const response = await fetch(`${baseURL}/${matchId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, match_state: matchState }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error actualizando el estado del match:", error);
    throw error;
  }
};

/**
 * Eliminar un match
 */
export const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(`${baseURL}/${matchId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error eliminando el match:", error);
    throw error;
  }
};