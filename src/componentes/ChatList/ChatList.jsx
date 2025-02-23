import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatRoom from "../chatRoom/ChatRoom";
import "./chatList.css";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [chatSeleccionado, setChatSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const usuarioLS = localStorage.getItem("user");
    if (usuarioLS) {
      const usuarioParseado = JSON.parse(usuarioLS);
      console.log("Usuario obtenido de localStorage:", usuarioParseado);
      setUsuario(usuarioParseado);
    }
  }, []);

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

  const manejarClickChat = (chat) => {
    setChatSeleccionado(chat);
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h3>Mis Chats</h3>
        <ul>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat.numRoom}
                onClick={() => manejarClickChat(chat)}
                className={`chat-item ${
                  chatSeleccionado && chatSeleccionado.numRoom === chat.numRoom
                    ? "selected"
                    : ""
                }`}
              >
                {chat.numRoom}
              </li>
            ))
          ) : (
            <p>No tienes chats disponibles</p>
          )}
        </ul>
      </div>

      <div className="chat-content">
        {chatSeleccionado ? (
          <ChatRoom numRoom={chatSeleccionado.numRoom} />
        ) : (
          <p>Seleccione un chat para iniciar la conversación.</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
