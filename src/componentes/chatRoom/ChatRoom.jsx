import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './chatRoom.css';
import { io } from "socket.io-client";

// Importar el JSON de emojis
import emojisData from './data/emojis.json';

function ChatRoom() {
  const { numRoom } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || { id: 1, name: "Invitado" };
  const usuario = user.name;

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [mostrarEmojis, setMostrarEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);  // Para almacenar el archivo seleccionado

  const mensajesContainerRef = useRef(null);

  // Usar los emojis cargados desde el JSON
  const emojis = emojisData.emojis;

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

    newSocket.on("chat_file", (data) => {
      setMensajes((prevMensajes) => [
        ...prevMensajes,
        {
          usuario: data.usuario,
          archivo: data.archivo,
          nombreArchivo: data.nombreArchivo,
          tipoArchivo: data.tipoArchivo
        }
      ]);
    });

    newSocket.on("error", (error) => {
      alert(error.error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [numRoom, usuario, navigate]);

  const enviarMensaje = () => {
    if (socket && nuevoMensaje.trim() !== "") {
      socket.emit("chat_message", {
        usuario,
        texto: nuevoMensaje,
        room: numRoom,
      });
      setNuevoMensaje("");
    }
  };

  const manejarTeclaEnter = (e) => {
    if (e.key === "Enter") {
      enviarMensaje();
    }
  };

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0]; // Obtener el primer archivo seleccionado

    if (archivo) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(archivo); // Guardar el archivo seleccionado

        if (socket) {
          socket.emit("chat_file", {
            usuario,
            archivo: reader.result, // El archivo convertido a base64
            nombreArchivo: archivo.name,
            tipoArchivo: archivo.type,
            room: numRoom
          });
        }
      };

      reader.readAsDataURL(archivo); // Convertir el archivo a base64
    }
  };

  useEffect(() => {
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
    }
  }, [mensajes]);

  const agregarEmoji = (emoji) => {
    setNuevoMensaje((prev) => prev + emoji);
    setMostrarEmojis(false);
  };

  return (
    <div className="App">
      <h3>Usuario: {usuario}</h3>

      <div className="mensajes-container" ref={mensajesContainerRef}>
        <ul className="ul-mensajes">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={`li-mensaje ${mensaje.usuario === usuario ? 'own-message' : ''}`}>
              {mensaje.usuario}: 
              {mensaje.texto && <span>{mensaje.texto}</span>}
              {mensaje.archivo && (
                mensaje.tipoArchivo.startsWith("image/") ? (
                  <img src={mensaje.archivo} alt={mensaje.nombreArchivo} className="archivo-imagen" />
                ) : (
                  <a href={mensaje.archivo} download={mensaje.nombreArchivo} className="archivo-enlace">
                    Descargar {mensaje.nombreArchivo}
                  </a>
                )
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-input-container">
        {/* Botón de Emojis */}
        <button 
          onClick={() => setMostrarEmojis(!mostrarEmojis)} 
          className="emoji-button"
        >
          😀
        </button>

        {/* Botón de archivo con ícono */}
        <label htmlFor="file-input" className="file-button">
          <span role="img" aria-label="Adjuntar archivo">📎</span>
        </label>
        <input 
          type="file" 
          id="file-input"
          onChange={manejarArchivo}
          style={{ display: "none" }}  // Hacer el input invisible
        />

        {/* Campo de texto del chat */}
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          onKeyDown={manejarTeclaEnter} 
          placeholder="Escribe..."
          className="chat-input"
        />

        {mostrarEmojis && (
          <div className="emoji-selector">
            {emojis.map((emoji, index) => (
              <span 
                key={index} 
                className="emoji" 
                onClick={() => agregarEmoji(emoji.emoji)} // Usamos emoji.emoji
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Botón de enviar mensaje */}
        <button onClick={enviarMensaje} className="send-button">➤</button>
      </div>
    </div>
  );
}

export default ChatRoom;
