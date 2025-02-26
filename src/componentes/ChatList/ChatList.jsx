import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatRoom from "../chatRoom/ChatRoom";
import "./chatList.css";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [chatSeleccionado, setChatSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [socket, setSocket] = useState(null);
  const [usuarios, setUsuarios] = useState({});

  // Obtener usuario actual desde localStorage
  useEffect(() => {
    const usuarioLS = localStorage.getItem("user");
    if (usuarioLS) {
      const usuarioParseado = JSON.parse(usuarioLS);
      console.log("Usuario obtenido de localStorage:", usuarioParseado);
      setUsuario(usuarioParseado);
    }
  }, []);

  // Conexión a socket y solicitud de chats
  useEffect(() => {
    if (!usuario) return;

    const socketInstance = io("http://localhost:4000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Conectado al servidor de sockets:", socketInstance.id);
      console.log("Usuario:", usuario);
      socketInstance.emit("get_user_chats", usuario.id);
    });

    socketInstance.on("user_chats", (data) => {
      console.log("Chats recibidos:", data);
      setChats(data);
    });

    socketInstance.on("chat_error", (errorMessage) => {
      console.error("Error de chat:", errorMessage);
      alert(errorMessage);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [usuario]);

  // Función para obtener el ID del otro usuario en un chat
  const obtenerOtroUsuarioId = (chat) => {
    if (!usuario) return null;
    return chat.user1_id === usuario.id ? chat.user2_id : chat.user1_id;
  };

  // Cuando los chats cambian, obtenemos los nombres de los otros usuarios (si no se han cargado)
  useEffect(() => {
    if (chats.length === 0) return;
    chats.forEach((chat) => {
      const otroUsuarioId = obtenerOtroUsuarioId(chat);
      if (otroUsuarioId && !usuarios[otroUsuarioId]) {
        fetch(`http://localhost:4000/api/users/${otroUsuarioId}`)
          .then((res) => res.json())
          .then((data) => {
            setUsuarios((prev) => ({ ...prev, [otroUsuarioId]: data.name }));
          })
          .catch((error) => {
            console.error("Error al obtener el usuario:", error);
            setUsuarios((prev) => ({ ...prev, [otroUsuarioId]: "Nombre no disponible" }));
          });
      }
    });
  }, [chats, usuario, usuarios]);

  const manejarClickChat = (chat) => {
    setChatSeleccionado(chat);
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h3>Mis Chats</h3>
        <ul>
          {chats.length > 0 ? (
            chats.map((chat) => {
              const otroUsuarioId = obtenerOtroUsuarioId(chat);
              const nombreUsuario = usuarios[otroUsuarioId] || "Cargando...";
              return (
                <li
                  key={chat.numRoom}
                  onClick={() => manejarClickChat(chat)}
                  className={`chat-item ${chatSeleccionado && chatSeleccionado.numRoom === chat.numRoom ? "selected" : ""}`}
                >
                  {nombreUsuario}
                </li>
              );
            })
          ) : (
            <p>No tienes chats disponibles</p>
          )}
        </ul>
      </div>

      <div className="chat-content">
        {chatSeleccionado ? (
          <ChatRoom numRoom={chatSeleccionado.numRoom} otroUsuario={usuarios[obtenerOtroUsuarioId(chatSeleccionado)]} />
        ) : (
          <p>Seleccione un chat para iniciar la conversación.</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
