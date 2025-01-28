import React, { useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginUser({ email, password });
      console.log('Token recibido:', token);

      // Guardar el token en localStorage (opcional)
      localStorage.setItem('authToken', token);

      // Navegar a la interfaz del juego
      navigate('/catalogo');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  const handleNavigate = () => {
    navigate('/registro');
  };

    return (
        <div className="login-father">
            <Header />
            <div className="login-body">
                <div className="login-container">
                    <h1 className="login-title">LOG IN</h1>
                    <input
                        type="text"
                        className="login-input-text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="login-input-text"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button-login" onClick={handleSubmit}>
                        Iniciar sesión
                    </button>
                    <p className="login-link" onClick={handleNavigate}>
                        ¿No estás registrado?
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
