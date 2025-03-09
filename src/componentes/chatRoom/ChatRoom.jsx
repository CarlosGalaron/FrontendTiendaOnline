import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./chatRoom.css";
import { io } from "socket.io-client";
import emojisData from "./data/emojis.json";

function ChatRoom({ numRoom: numRoomProp, otroUsuario }) {
  const { numRoom: numRoomParam } = useParams();
  const numRoom = numRoomProp || numRoomParam;

  const user = JSON.parse(localStorage.getItem("user"));

  const [socket, setSocket] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [mostrarEmojis, setMostrarEmojis] = useState(false);
  const [usuarios, setUsuarios] = useState({});

  const mensajesContainerRef = useRef(null);
  const emojis = emojisData.emojis;

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join_room", { room: numRoom, usuarioId: user.id });
    });

    newSocket.emit("get_chat_users", numRoom);

    newSocket.on("chat_users", async (ids) => {
      if (ids.length === 2) {
        const otroUsuarioId = ids.find((id) => id !== user.id);
        if (otroUsuarioId) {
          if (usuarios[otroUsuarioId]) {
            // No need to fetch if already cached
          } else {
            try {
              const res = await fetch(`http://localhost:4000/api/users/${otroUsuarioId}`);
              if (!res.ok) throw new Error("Error al obtener el usuario");
              const data = await res.json();
              const nombre = data.name || "Desconocido";
              setUsuarios((prev) => ({ ...prev, [otroUsuarioId]: nombre })); // Cache the user
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          }
        }
      }
    });

    newSocket.on("chat_message", (data) => {
      setMensajes((prev) => [...prev, data]);
    });

    newSocket.on("chat_history", (historial) => {
      setMensajes(historial);
    });

    newSocket.on("chat_file", (data) => {
      setMensajes((prev) => [
        ...prev,
        {
          usuario: data.usuario,
          archivo: data.archivo,
          nombreArchivo: data.nombreArchivo,
          tipoArchivo: data.tipoArchivo,
        },
      ]);
    });

    newSocket.on("chat_error", (error) => {
      alert(error);
    });

    newSocket.on("disconnect", () => {
      console.log("🔴 Un usuario se ha desconectado");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [numRoom, user.id, usuarios]);

  useEffect(() => {
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = () => {
    if (socket && nuevoMensaje.trim() !== "") {
      socket.emit("chat_message", {
        usuario: user.name,
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
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (socket) {
          socket.emit("chat_file", {
            usuario: user.name,
            archivo: reader.result,
            nombreArchivo: archivo.name,
            tipoArchivo: archivo.type,
            room: numRoom,
          });
        }
      };
      reader.readAsDataURL(archivo);
      e.target.value = null;
    }
  };

  const agregarEmoji = (emoji) => {
    setNuevoMensaje((prev) => (prev ? prev + emoji : emoji)); 
  };

  return (
    <div className="App">
      <div className="mensajes-container" ref={mensajesContainerRef}>
        <ul className="ul-mensajes">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={`li-mensaje ${mensaje.usuario === user.name ? "own-message" : "other-message"}`}>
              {mensaje.usuario}: {mensaje.texto && <span>{mensaje.texto}</span>}
              {mensaje.archivo &&
                (mensaje.tipoArchivo.startsWith("image/") ? (
                  <img src={mensaje.archivo} alt={mensaje.nombreArchivo} className="archivo-imagen" />
                ) : (
                  <a href={mensaje.archivo} download={mensaje.nombreArchivo} className="archivo-enlace">
                    Descargar {mensaje.nombreArchivo}
                  </a>
                ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input-container">
        <button onClick={() => setMostrarEmojis(!mostrarEmojis)} className="emoji-button">
          😀
        </button>
        <label htmlFor="file-input" className="file-button">
          <span role="img" aria-label="Adjuntar archivo">📎</span>
        </label>
        <input type="file" id="file-input" onChange={manejarArchivo} style={{ display: "none" }} />
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
              <span key={index} className="emoji" onClick={() => agregarEmoji(emoji.emoji)}>
                {emoji.emoji}
              </span>
            ))}
          </div>
        )}
        <button onClick={enviarMensaje} className="send-button">➤</button>
      </div>
    </div>
  );
}

export default ChatRoom;