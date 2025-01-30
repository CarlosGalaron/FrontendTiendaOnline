import React from 'react'
import './IntercambioHome.css'
import Header from '../../componentes/Header/Header'
import FooterHomepage from '../../componentes/Footer/Footer'

function IntercambioHome() {
  return (
    <div className='IntercambioHome-father'>
      <Header />
      <div className='IntercambioHome-body'>
        <nav className='IntercambioHome-nav'>
          <button className='IntercambioHome-nav-button'>Mis contactos</button>
          <button className='IntercambioHome-nav-button'>Chats</button>
          <button className='IntercambioHome-nav-button'>Ofertas</button>
          <button className='IntercambioHome-nav-button'>Solicitudes</button>
        </nav>
      </div>
      <FooterHomepage />

    </div>
  )
}

export default IntercambioHome