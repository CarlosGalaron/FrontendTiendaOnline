import React, { useState } from 'react'
import './IntercambioHome.css'
import Header from '../../componentes/Header/Header'
import FooterHomepage from '../../componentes/Footer/Footer'

function IntercambioHome() {
  // Estado para la opción seleccionada
  const [selectedOption, setSelectedOption] = useState('chats')

  // Función para manejar el cambio de opción
  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }

  // Contenido según la opción seleccionada
  const renderContent = () => {
    switch (selectedOption) {
      case 'chats':
        return (
          <div className='Intercambio-chat-body'>
            <div className='contact-list-container'></div>
            <div className='chat-container'>
              <div className='chat-tools'></div>
              <div className='chat-message-container'></div>
              <div className='chat-input-container'></div>
            </div>
          </div>
        )
      case 'mis-busquedas':
        return (
          <div className='Intercambio-busqueda-body'>
            <div className='ofertas-list-container'></div>
            <div className='solicitudes-list-container'></div>            
          </div>
        )
      case 'ofertas': //para crear una oferta
        return (
          <div><h1>Ofertas</h1><p>Contenido de ofertas</p>
          </div>)
      case 'solicitudes': //para crear una solicitud
        return (
          <div className='Intercambio-solicitud-body'>
          </div>
        )
      default:
        return (
          <div className='IntercambioHome-content'>
          </div>
        )
    }
  }

  return (
    <div className='IntercambioHome-father'>
      <Header />
      <div className='IntercambioHome-body'>
        <nav className='IntercambioHome-nav'>
          <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('chats')}>CHATS</button>
          <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('mis-busquedas')}>MIS BÚSQUEDAS</button>
          <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('ofertas')}>OFERTAS</button>
          <button className='IntercambioHome-nav-button' onClick={() => handleOptionChange('solicitudes')}>SOLICITUDES</button>
        </nav>
        <div className='IntercambioHome-content'>
          {renderContent()} {/* Aquí se cambia el contenido según la opción seleccionada */}
        </div>
      </div>
      <FooterHomepage />
    </div>
  )
}

export default IntercambioHome
