import React, { useState } from 'react';
import './IntercambioHome.css';
import Header from '../../componentes/Header/Header';
import FooterHomepage from '../../componentes/Footer/Footer';
import Ofertas from '../../componentes/Ofertas/Ofertas';
import Solicitudes from '../../componentes/Solicitudes/Solicitudes';
import { createOffer, createRequest } from '../../api/bookApi'; // Importamos las nuevas funciones de la API

function IntercambioHome() {
  const [selectedOption, setSelectedOption] = useState('chats');
  const [mostrarOfertas, setMostrarOfertas] = useState(true);

  // Estados para capturar datos del formulario
  const [offerData, setOfferData] = useState({ title: '', author: '', book_state: '' });
  const [requestData, setRequestData] = useState({ title: '', author: '', book_state: '' });

  // Obtener el ID del usuario autenticado desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleBusqueda = () => {
    setMostrarOfertas(!mostrarOfertas);
  };

  // Función para manejar los cambios en los inputs
  const handleInputChange = (event, setStateFunction) => {
    const { name, value } = event.target;
    setStateFunction((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para enviar una oferta
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Debes iniciar sesión para crear una oferta.');
      return;
    }

    try {
      await createOffer({ ...offerData, user_id: userId });
      alert('Oferta creada con éxito');
      setOfferData({ title: '', author: '', book_state: '' }); // Resetear formulario
    } catch (error) {
      console.error('Error al crear oferta:', error);
      alert('No se pudo crear la oferta.');
    }
  };

  // Función para enviar una solicitud
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Debes iniciar sesión para crear una solicitud.');
      return;
    }

    try {
      await createRequest({ ...requestData, user_id: userId });
      alert('Solicitud creada con éxito');
      setRequestData({ title: '', author: '', book_state: '' }); // Resetear formulario
    } catch (error) {
      console.error('Error al crear solicitud:', error);
      alert('No se pudo crear la solicitud.');
    }
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
            <form className='form-oferta' onSubmit={handleCreateOffer}>
              <label>Título</label>
              <input
                type="text"
                name="title"
                placeholder="Don Quijote de la Mancha"
                value={offerData.title}
                onChange={(e) => handleInputChange(e, setOfferData)}
              />
              <label>Autor</label>
              <input
                type="text"
                name="author"
                placeholder="Miguel de Cervantes"
                value={offerData.author}
                onChange={(e) => handleInputChange(e, setOfferData)}
              />
              <label>Estado del libro</label>
              <input
                type="text"
                name="book_state"
                placeholder="Nuevo/Seminuevo/Deteriorado"
                value={offerData.book_state}
                onChange={(e) => handleInputChange(e, setOfferData)}
              />
              <button className='form-button' type="submit">Crear oferta</button>
            </form>
          </div>
        );
      case 'solicitudes':
        return (
          <div className='Intercambio-form-body'>
            <form className='form-solicitud' onSubmit={handleCreateRequest}>
              <label>Título</label>
              <input
                type="text"
                name="title"
                placeholder="Don Quijote de la Mancha"
                value={requestData.title}
                onChange={(e) => handleInputChange(e, setRequestData)}
              />
              <label>Autor</label>
              <input
                type="text"
                name="author"
                placeholder="Miguel de Cervantes"
                value={requestData.author}
                onChange={(e) => handleInputChange(e, setRequestData)}
              />
              <label>Estado del libro</label>
              <input
                type="text"
                name="book_state"
                placeholder="Nuevo/Seminuevo/Deteriorado"
                value={requestData.book_state}
                onChange={(e) => handleInputChange(e, setRequestData)}
              />
              <button className='form-button' type="submit">Crear solicitud</button>
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
        <button onClick={() => handleOptionChange('chats')}>CHATS</button>
        <button onClick={() => handleOptionChange('mis-busquedas')}>MIS BÚSQUEDAS</button>
        <button onClick={() => handleOptionChange('ofertas')}>OFERTAS</button>
        <button onClick={() => handleOptionChange('solicitudes')}>SOLICITUDES</button>
      </nav>
      <div className='IntercambioHome-content'>{renderContent()}</div>
      <FooterHomepage />
    </div>
  );
}

export default IntercambioHome;
