// Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import imgUsuario from '../../assets/images/imgUsuario.png';
import logout from '../../assets/images/logout.png';
import cross from '../../assets/images/cross.png';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Estado para mostrar la ventana de ajustes

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

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Alternar la visibilidad de la ventana de ajustes
  };

  const handleUserClick = () => {
    navigate('/usuario'); // Navegar a la página de usuario
    setShowSettings(false); // Cerrar la ventana de ajustes
  };

  return (
    <div className="header-container">
      <button onClick={handleLogoClick} className="header-icon_button">
        <img src="/LogoClaro.png" alt="logo" className="header-icon_container" />
      </button>

      {isLoggedIn ? (
        <>  
        <div className='header-buttons-body'>
          <button className="header-button" onClick={() => navigate('/catalogo')}>Tienda</button>
          <button className="header-button" onClick={() => navigate('/IntercambioHome')}>Intercambio</button>
          <button className="header-button" onClick={() => navigate('/tienda')}>Cesta</button>
          <button className="header-button" onClick={toggleSettings}>Ajustes</button> 
        </div>


          {showSettings && (
            <div className="settings-popup">
              <button  id='close-b' onClick={toggleSettings}><img id='close' className='icon-adj' src={cross} alt="cross" /></button> 
              <div className='use-lout'>
              <button className="settings-button" onClick={handleUserClick}><img className='icon-adj' src={imgUsuario} alt="imgUsuario" />Usuario</button>
              <button className="settings-button"  onClick={handleLogout}><img className='icon-adj' id='logout-btn' src={logout} alt="logout" />LogOut</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="headerH-container">
          <div className="navigate-login-button" onClick={handleSignUpClick}>SIGN IN</div>
          <div className="navigate-login-button" onClick={handleLoginClick}>LOG IN</div>
        </div>
      )}
    </div>
  );
}

export default Header;