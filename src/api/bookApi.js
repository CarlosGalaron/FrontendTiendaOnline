// src/api/bookApi.js

// const API_URL = 'http://localhost:4000/api/books'; --> sustituir en los fetch


// createOffer de prueba para debugear:
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
        const response = await fetch("http://localhost:4000/api/books/register-exchange", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offerData),
        });

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



//createOffer original:
// export const createOffer = async ({ user_id, title, author, book_state }) => {
//     const response = await fetch(`${API_URL}/exchange`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             user_id,
//             type: 'oferta',  // Se asigna explícitamente el tipo "oferta"
//             title,
//             author,
//             book_state,
//         }),
//     });

//     if (!response.ok) {
//         throw new Error('Error al crear la oferta');
//     }

//     return await response.json();
// };

export const createRequest = async ({ user_id, title, author, book_state }) => {
    try {
        console.log("Enviando solicitud con datos:", { user_id, type: 'solicitud', title, author, book_state });

        const response = await fetch('http://localhost:4000/api/books/register-exchange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                type: 'solicitud',  // Se asigna explícitamente el tipo "solicitud"
                title,
                author,
                book_state,
            }),
        });

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
