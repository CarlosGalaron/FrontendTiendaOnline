// src/paginas/UserProfile/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./UserProfile.css";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import { getUserById, updateUser, deleteUser } from "../../api/userApi"; // Import API functions

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        fetchUserData(parsedUser.id);
      } catch (error) {
        console.error("Error al parsear el usuario del localStorage", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    const nuevoNombre = prompt("Editar nombre", user.name);
    if (!nuevoNombre) return; // If the name is not provided, do not proceed.

    const nuevoPassword = prompt("Editar contraseña"); // Prompt for new password
    if (!nuevoPassword) return; // If the password is not provided, do not proceed.

    const confirmPassword = prompt("Confirma la nueva contraseña"); // Prompt for password confirmation
    if (nuevoPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden. Intenta nuevamente.");
      return; // If passwords do not match, do not proceed.
    }

    // Create an updated user object
    const updatedUser = { ...user, name: nuevoNombre, password: nuevoPassword };

    try {
      const response = await updateUser(updatedUser);
      setUser(response); // Update state with the response
      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error actualizando usuario", error);
      alert("Error al actualizar el usuario");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await deleteUser(user.id);
        localStorage.removeItem("authToken"); // Eliminar el token del almacenamiento
        localStorage.removeItem("user"); // Eliminar el usuario del almacenamiento
        alert("Usuario eliminado con éxito");
        navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
      } catch (error) {
        console.error("Error eliminando usuario", error);
        alert("Error al eliminar el usuario");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No se encontró información del usuario</div>;
  }

  return (
    <div className="userBody">
      <Header />
      <div className="profile-container">
        <h1>Perfil de Usuario</h1>
        <table className="profile-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td> {/* Display email as read-only */}
            </tr>
            {/* Fila para los botones */}
            <tr>
              <td colSpan="3">
                <button className="btn-edit" onClick={handleEdit}>
                  Editar
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
