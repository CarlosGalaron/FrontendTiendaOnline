import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatRoom from "../../componentes/chatRoom/ChatRoom";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [chatSeleccionado, setChatSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [socket, setSocket] = useState(null);

  // Obtener el usuario desde localStorage
  useEffect(() => {
    const usuarioLS = localStorage.getItem("user");
    if (usuarioLS) {
      const usuarioParseado = JSON.parse(usuarioLS);
      console.log("Usuario obtenido de localStorage:", usuarioParseado);
      setUsuario(usuarioParseado);
    }
  }, []);

  // Configurar el socket cuando el usuario esté definido
  useEffect(() => {
    if (!usuario) return;

    // Conecta al servidor de sockets en el puerto 4000 (igual que en ChatRoom)
    const socketInstance = io("http://localhost:4000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Conectado al servidor de sockets:", socketInstance.id);
      console.log("Usuario:", usuario);
      // Emitir el evento para obtener los chats del usuario
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

    // Desconectar al desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, [usuario]);

  const manejarClickChat = (chat) => {
    setChatSeleccionado(chat);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "1rem" }}>
        <h3>Mis Chats</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat.numRoom}
                onClick={() => manejarClickChat(chat)}
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor:
                    chatSeleccionado && chatSeleccionado.numRoom === chat.numRoom
                      ? "#f0f0f0"
                      : "#fff",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {chat.numRoom}
              </li>
            ))
          ) : (
            <p>No tienes chats disponibles</p>
          )}
        </ul>
      </div>

      <div style={{ width: "70%", padding: "1rem" }}>
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
