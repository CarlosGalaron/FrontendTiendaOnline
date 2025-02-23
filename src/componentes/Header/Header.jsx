//Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkLoginStatus);
    checkLoginStatus(); // Verificar al montar

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminar el token del almacenamiento
    localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento
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
    navigate('/catalogo'); // Ir a la vista de catalogo
  };

  return (
    <div className="header-container">
      <button onClick={handleLogoClick} className="header-icon_button">
        <img src="/LogoClaro.png" alt="logo" className="header-icon_container" />
      </button>

      {isLoggedIn ? (
        <>
          <button className="header-button" onClick={() => navigate('/catalogo')}>Tienda</button>
          <button className="header-button" onClick={() => navigate('/seleccion')}>Selección de libros</button>
          <button className="header-button" onClick={() => navigate('/IntercambioHome')}>Usuario</button>
          <button className="header-button" onClick={() => navigate('/tienda')}>Cesta</button>
          <button className="header-button logout-button" onClick={handleLogout}>LOG OUT</button>
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
