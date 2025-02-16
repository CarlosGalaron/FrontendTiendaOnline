import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UlMensajes, LiMensaje } from "./ui-components";

function ChatRoom() {
  const { numRoom } = useParams();
  const navigate = useNavigate();

  // Obtener usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { id: 1, name: "Invitado" };
  const usuario = user.name; // Usamos el nombre en lugar del ID

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      newSocket.emit("join_room", { room: numRoom, usuario });
    });

    newSocket.on("room_full", (data) => {
      alert(data.message);
      setIsConnected(false);
      navigate("/");
    });

    newSocket.on("chat_message", (data) => {
      setMensajes((prevMensajes) => [...prevMensajes, data]);
    });

    newSocket.on("chat_history", (historial) => {
      setMensajes(historial);
    });

    newSocket.on("error", (error) => {
      alert(error.error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [numRoom, usuario, navigate]);

  const enviarMensaje = () => {
    if (socket && nuevoMensaje) {
      socket.emit("chat_message", {
        usuario,
        texto: nuevoMensaje,
        room: numRoom,
      });
      setNuevoMensaje("");
    }
  };

  return (
    <div className="App">
      <h2>{isConnected ? `Conectado a la sala ${numRoom}` : "No conectado"}</h2>
      <h3>Usuario: {usuario}</h3>
      <UlMensajes>
        {mensajes.map((mensaje, index) => (
          <LiMensaje key={index} isOwnMessage={mensaje.usuario === usuario}>
            {mensaje.usuario}: {mensaje.texto}
          </LiMensaje>
        ))}
      </UlMensajes>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default ChatRoom;
