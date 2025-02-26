const API_URL = 'http://localhost:4000/api/users';

// Function to create a new user
export const createUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const text = await response.text(); // Recibe la respuesta como texto
    console.log('Respuesta del servidor:', text); // Muestra el contenido de la respuesta

    try {
        const data = JSON.parse(text); // Intenta parsear el texto como JSON
        return data;
    } catch (error) {
        throw new Error('La respuesta del servidor no es un JSON válido');
    }
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al iniciar sesión');
    }

    const { token, user } = await response.json();

    // Guardamos el token y el usuario en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
};
// Function to fetch all users
export const getUsers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error fetching users');
    }
    return await response.json();
};

// Function to fetch a user by ID
export const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching user');
    }
    return await response.json();
};

// Function to update a user
export const updateUser = async (user) => {
    const response = await fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Error updating user');
    }

    return await response.json();
};

// Function to delete a user
export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting user');
    }
};
