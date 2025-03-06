import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Matches.css";

const socket = io("http://localhost:4000");

const Matches = ({ match }) => {
  
  const [chatCreado, setChatCreado] = useState(false);

  useEffect(() => {
    const chatsGuardados = JSON.parse(localStorage.getItem("chatsCreados")) || {};
    if (chatsGuardados[match.id]) {
      setChatCreado(true);
    }
  }, [match.id]);

  const handleAceptarMatch = () => {
    match.id_user1 = match.mi_oferta.registrado_por;
    match.id_user2 = match.su_oferta.registrado_por;
    if (!match.id_user1 || !match.id_user2) {
      alert("Error: No se pueden obtener los IDs de los usuarios.");
      return;
    }

    if (chatCreado) {
      alert("El chat ya ha sido creado.");
      return;
    }

    socket.emit("join_room", { room: null, user1_id: match.id_user1, user2_id: match.id_user2 }, (response) => {
      if (response.success) {
        setChatCreado(true);
        const chatsGuardados = JSON.parse(localStorage.getItem("chatsCreados")) || {};
        chatsGuardados[match.id] = true;
        localStorage.setItem("chatsCreados", JSON.stringify(chatsGuardados));
        console.log("Chat creado exitosamente");
      } else {
        alert("Error al crear el chat.");
      }
    });
  };

  if (!match || !match.mi_oferta || !match.su_oferta) {
    return (
      <div className="match-card">
        <p>Error: Datos del match incompletos o inválidos.</p>
      </div>
    );
  }

  return (
    <div className="match-card">
      <div className="match-details">
        <h3>Tu oferta:</h3>
        <p><strong>Título:</strong> {match.mi_oferta.title || "No disponible"}</p>
        <p><strong>Autor:</strong> {match.mi_oferta.author || "No disponible"}</p>
        <p><strong>Tipo:</strong> {match.mi_oferta.type || "No disponible"}</p>
        <p><strong>Estado:</strong> {match.mi_oferta.state || "No disponible"}</p>

        <h3>Su oferta:</h3>
        <p><strong>Título:</strong> {match.su_oferta.title || "No disponible"}</p>
        <p><strong>Autor:</strong> {match.su_oferta.author || "No disponible"}</p>
        <p><strong>Tipo:</strong> {match.su_oferta.type || "No disponible"}</p>
        <p><strong>Estado:</strong> {match.su_oferta.state || "No disponible"}</p>
      </div>

      <button
        className="aceptar-match-btn"
        onClick={handleAceptarMatch}
        disabled={!match.mi_oferta.registrado_por || !match.su_oferta.registrado_por || chatCreado}
      >
        {chatCreado ? "CHAT CREADO" : "ACEPTAR MATCH"}
      </button>
    </div>
  );
};

export default Matches;
