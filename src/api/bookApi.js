// src/api/bookApi.js


// const API_URL = 'http://localhost:4000/api/books'; --> sustituir en los fetch

// createOffer
export const createOffer = async ({ user_id, title, author, book_state }) => {
  const offerData = {
    user_id,
    type: "oferta", // Aseguramos que siempre es oferta
    title,
    author,
    book_state,
  };

  console.log("Enviando oferta con datos:", offerData);

  try {
    const response = await fetch(
      "http://localhost:4000/api/books/exchange",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      }
    );

    const text = await response.text(); // Obtener texto de respuesta

    console.log("Respuesta bruta del servidor:", text);
    console.log("Código de estado HTTP:", response.status);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} - ${text}`);
    }

    const jsonResponse = JSON.parse(text);
    console.log("Respuesta parseada en JSON:", jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error("Error en createOffer:", error.message);
    throw error;
  }
};

// createRequest
export const createRequest = async ({ user_id, title, author, book_state }) => {
  try {
    console.log("Enviando solicitud con datos:", {
      user_id,
      type: "solicitud",
      title,
      author,
      book_state,
    });

    const response = await fetch(
      "http://localhost:4000/api/books/exchange",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          type: "solicitud", // Se asigna explícitamente el tipo "solicitud"
          title,
          author,
          book_state,
        }),
      }
    );

    const text = await response.text();
    console.log("Respuesta bruta del servidor:", text);
    console.log("Código de estado HTTP:", response.status);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} - ${text}`);
    }

    const data = JSON.parse(text);
    console.log("Respuesta parseada en JSON:", data);
    return data;
  } catch (error) {
    console.error("Error en createRequest:", error.message);
    throw error;
  }
};

// Para listar las ofertas y solicitudes de un usuario:
export const getUserExchangeBooks = async (user_id) => {
  try {
    console.log(`Obteniendo ofertas y solicitudes del usuario ${user_id}...`);

    if (!user_id) {
      console.error("⚠️ ERROR: `user_id` no tiene valor válido:", user_id);
      throw new Error("El user_id no puede ser undefined o null");
    }

    const response = await fetch(
      `http://localhost:4000/api/books/exchange/${user_id}`
    );
    const text = await response.text();

    console.log("Respuesta bruta del servidor:", text);
    console.log("Código de estado HTTP:", response.status);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} - ${text}`);
    }

    const data = JSON.parse(text);
    console.log("Datos obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error en getUserExchangeBooks:", error.message);
    throw error;
  }
};
/**
 * Obtiene la lista de libros del catálogo desde el backend.
 *
 * @returns {Promise<Array>} Un array con los libros obtenidos.
 * @throws {Error} Si la respuesta no es un JSON válido o ocurre otro error.
 */
export const getBooks = async () => {
  const response = await fetch("http://localhost:4000/api/books/catalog", {
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
// Función para eliminar una oferta
export const deleteOffer = async (offerId) => {
  const response = await fetch(`http://localhost:4000/api/books/offers/${offerId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la oferta");
  }
  return response.json();
};

// Función para actualizar una oferta
export const updateOffer = async (offer) => {
  const response = await fetch(`http://localhost:4000/api/books/offers/${offer.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(offer),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la oferta");
  }
  return response.json();
};

// Función para eliminar una solicitud
export const deleteRequest = async (requestId) => {
  const response = await fetch(`http://localhost:4000/api/books/solicitudes/${requestId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la solicitud");
  }
  return response.json();
};

// Función para actualizar una solicitud
export const updateRequest = async (request) => {
  const response = await fetch(`http://localhost:4000/api/books/solicitudes/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la solicitud");
  }
  return response.json();
};

