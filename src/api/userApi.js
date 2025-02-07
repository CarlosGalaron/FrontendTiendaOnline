// api.js
export const createUser = async (userData) => {
    const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const text = await response.text(); // Recibe la respuesta como texto
    console.log(text); // Muestra el contenido de la respuesta

    try {
        const data = JSON.parse(text); // Intenta parsear el texto como JSON
        return data;
    } catch (error) {
        throw new Error('Respuesta no es un JSON válido');
    }
};

export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al iniciar sesión');
    }
  
    return await response.json();
  };
  
// REVISAR
//Para pedir un usuario por id REVISAR
// export const loadUser = async (id) => {
//     const response = await fetch(`http://localhost:4000/api/users/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (!response.ok) throw new Error('Error al obtener el usuario');

//     return await response.json();

// };