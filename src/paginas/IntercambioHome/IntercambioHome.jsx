import React, { useState } from 'react';
import './IntercambioHome.css';
import Header from '../../componentes/Header/Header';
import FooterHomepage from '../../componentes/Footer/Footer';
import Ofertas from '../../componentes/Ofertas/Ofertas';
import Solicitudes from '../../componentes/Solicitudes/Solicitudes';

function IntercambioHome() {
  const [selectedOption, setSelectedOption] = useState('chats');
  const [mostrarOfertas, setMostrarOfertas] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleBusqueda = () => {
    setMostrarOfertas(!mostrarOfertas);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'chats':
        return (
          <div className='Intercambio-chat-body'>
            <div className='contact-list-container'>
              <div className='chat-contact-card'></div>
              <div className='chat-contact-card'></div>
              <div className='chat-contact-card'></div>
            </div>
            <div className='chat-container'>
              <div className='chat-header'>
                <div className='chat-title'>Nombre del contacto</div>
                <div className='chat-tools'>Botones de ajustes del chat</div>
              </div>
              <div className='chat-message-container'>
                <ul className='chat-message-list'>
                  <li>Mensaje 1</li>
                  <li>Mensaje 2</li>
                  <li>Mensaje 3</li>
                  <button>Enviar</button>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'mis-busquedas':
        return (
          <div className='Intercambio-busqueda-body'>
            <button className='busqueda-toggle-button' onClick={toggleBusqueda}>
              {mostrarOfertas ? 'Ver Solicitudes' : 'Ver Ofertas'}
            </button>
            <div className='busqueda-list-container'>
              {mostrarOfertas ? <Ofertas /> : <Solicitudes />}
            </div>
          </div>
        );
      case 'ofertas':
        return (
          <div className='Intercambio-form-body'>
            <form className='form-oferta'>
              <label>Título</label>
              <input type="text" placeholder="Don Quijote de la Mancha" />
              <label>Autor</label>
              <input type="text" placeholder="Miguel de Cervantes" />
              <label>Estado del libro</label>
              <input type="text" placeholder="Nuevo/Seminuevo/Deteriorado" />
              <button className='form-button'>Crear oferta</button>
            </form>
          </div>
        );
      case 'solicitudes':
        return (
          <div className='Intercambio-form-body'>
            <form className='form-solicitud'>
              <label>Título</label>
              <input type="text" placeholder="Don Quijote de la Mancha" />
              <label>Autor</label>
              <input type="text" placeholder="Miguel de Cervantes" />
              <label>Estado del libro</label>
              <input type="text" placeholder="Nuevo/Seminuevo/Deteriorado" />
              <button className='form-button'>Crear solicitud</button>
            </form>
          </div>
        );
      default:
        return <div className='IntercambioHome-content'></div>;
    }
  };

  return (
    <div className='IntercambioHome-father'>
      <Header />
      <nav className='IntercambioHome-nav'>
        <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('chats')}>CHATS</button>
        <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('mis-busquedas')}>MIS BÚSQUEDAS</button>
        <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('ofertas')}>OFERTAS</button>
        <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('solicitudes')}>SOLICITUDES</button>
      </nav>
      <div className='IntercambioHome-content'>
        {renderContent()}
      </div>
      <FooterHomepage />
    </div>
  );
}

export default IntercambioHome;
