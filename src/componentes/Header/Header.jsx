import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Convertir el token en un valor booleano
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminar el token del almacenamiento
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login'); // Ir a la vista de login
  };

  const handleSignUpClick = () => {
    navigate('/registro'); // Ir a la vista de registro
  };

  const handleLogoClick = () => {
    navigate('/catalogo'); 
  };

  return (
    <div className="header-container">
      <button onClick={handleLogoClick} className="header-icon_button">
        <img src="/LogoClaro.png" alt="logo" className="header-icon_container" />
      </button>

      {isLoggedIn ? (
        <>
          <button className="header-button" onClick={() => navigate('/Catalogo')}>Tienda</button>
          <button className="header-button" onClick={() => navigate('/Seleccion')}>Selección de libros</button>
          <button className="header-button" onClick={() => navigate('/biblioteca')}>Usuario</button>
          <button className="header-button" onClick={() => navigate('/tienda')}>CESTA</button>
          <button className="header-button logout-button" onClick={handleLogout}>CERRAR SESIÓN</button>
        </>
      ) : (
        <div className="headerH-container">
          <div className="navigate-login-button" onClick={handleLoginClick}>LOG IN</div>
          <div className="navigate-login-button" onClick={handleSignUpClick}>SIGN IN</div>
        </div>
      )}
    </div>
  );
}

export default Header;
