// src/componentes/Chats/Chats.jsx
import React from 'react';
import './Chats.css'; // Crea este archivo para darle estilo a los chats

const Chats = () => {
  return (
    <div className="chats-container">
      <div className="contact-list-container">
        <div className="chat-contact-card">Contacto 1</div>
        <div className="chat-contact-card">Contacto 2</div>
        <div className="chat-contact-card">Contacto 3</div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-title">Nombre del contacto</div>
          <div className="chat-tools">[Ajustes]</div>
        </div>
        <div className="chat-message-container">
          <ul className="chat-message-list">
            <li>Mensaje 1</li>
            <li>Mensaje 2</li>
            <li>Mensaje 3</li>
          </ul>
          <button className="chat-send-button">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
