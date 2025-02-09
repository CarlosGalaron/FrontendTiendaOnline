// src/api/bookApi.js

/**
 * Obtiene la lista de libros desde el backend.
 *
 * @returns {Promise<Array>} Un array con los libros obtenidos.
 * @throws {Error} Si la respuesta no es un JSON válido o ocurre otro error.
 */
export const getBooks = async () => {
  const response = await fetch("http://localhost:4000/api/books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  console.log("Respuesta de getBooks:", text);

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    throw new Error("Respuesta no es un JSON válido");
  }
};
