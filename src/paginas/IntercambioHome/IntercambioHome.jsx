// src/paginas/IntercambioHome/IntercambioHome.jsx
import React, { useState, useEffect } from 'react';
import './IntercambioHome.css';
import Header from '../../componentes/Header/Header';
import FooterHomepage from '../../componentes/Footer/Footer';

import Ofertas from '../../componentes/Ofertas/Ofertas';
import Solicitudes from '../../componentes/Solicitudes/Solicitudes';
import { createOffer, createRequest, getUserExchangeBooks } from '../../api/bookApi'; // Importamos la API
import ChatList from '../../componentes/ChatList/ChatList';
import MisMatches from '../../componentes/misMatches/MisMatches';
import Chats from '../../componentes/IntercambioHomeComponents/Chats';
import MisBusquedas from '../../componentes/IntercambioHomeComponents/MisBusquedas';
import OfertasForm from '../../componentes/IntercambioHomeComponents/OfertasForm';
import SolicitudesForm from '../../componentes/IntercambioHomeComponents/SolicitudesForm';

function IntercambioHome() {

  const [selectedOption, setSelectedOption] = useState('chats');
  const [mostrarOfertas, setMostrarOfertas] = useState(true);
  const [ofertas, setOfertas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offerData, setOfferData] = useState({ title: '', author: '', book_state: '' });
  const [requestData, setRequestData] = useState({ title: '', author: '', book_state: '' });


  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchBooks = async () => {
      try {
        const books = await getUserExchangeBooks(userId);
        setOfertas(books.filter(book => book.type === "oferta"));
        setSolicitudes(books.filter(book => book.type === "solicitud"));
      } catch (error) {
        console.error("Error al obtener los libros de intercambio", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleBusqueda = () => {
    setMostrarOfertas(!mostrarOfertas);
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === "offer") {
      setOfferData((prevData) => ({ ...prevData, [name]: value }));
    } else if (type === "request") {
      setRequestData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Debes iniciar sesión para crear una oferta.");
      return;
    }
  
    try {
      const newOffer = { ...offerData, user_id: userId };
      const response = await createOffer(newOffer);
      alert("Oferta creada con éxito");
  
      if (response.matchId) {
        alert(`¡Se ha encontrado un match con el usuario ${response.matchedUserId}!`);
      }
  
      setOfferData({ title: "", author: "", book_state: "" });
    } catch (error) {
      console.error("Error al crear oferta:", error);
      alert("No se pudo crear la oferta.");
    }
  };
  
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Debes iniciar sesión para crear una solicitud.");
      return;
    }
  
    try {
      const newRequest = { ...requestData, user_id: userId };
      const response = await createRequest(newRequest);
      alert("Solicitud creada con éxito");
  
      if (response.matchId) {
        alert(`¡Se ha encontrado un match con el usuario ${response.matchedUserId}!`);
      }
  
      setRequestData({ title: "", author: "", book_state: "" });
    } catch (error) {
      console.error("Error al crear solicitud:", error);
      alert("No se pudo crear la solicitud.");
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'chats':
        return (
          <div className='Intercambio-chat-body'>
            <ChatList/>
          </div>
        );
      case 'mis-busquedas':
        return (
          <MisBusquedas 
  mostrarOfertas={mostrarOfertas} 
  toggleBusqueda={toggleBusqueda} 
  loading={loading} 
  ofertas={ofertas} 
  solicitudes={solicitudes}
  setOfertas={setOfertas}
  setSolicitudes={setSolicitudes} 
/>

        
        );
      case 'ofertas':
        return (
          <OfertasForm 
            offerData={offerData} 
            handleInputChange={handleInputChange} 
            handleCreateOffer={handleCreateOffer} 
          />
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
        case 'matches':
        return (
          <div className='Intercambio-matches-body'>
            <MisMatches/>
          </div>
          <SolicitudesForm 
            requestData={requestData} 
            handleInputChange={handleInputChange} 
            handleCreateRequest={handleCreateRequest} 
          />
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
        <button onClick={() => handleOptionChange('matches')}>MIS MATCHES</button>
      </nav>
      <div className='IntercambioHome-content'>{renderContent()}</div>
      <FooterHomepage />
    </div>
  );
}

export default IntercambioHome;
