//app.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./paginas/Homepage/Homepage";
import Login from "./paginas/Login/Login";
import Registro from "./paginas/Registro/Registro";
import Seleccion from "./paginas/SeleccionLibros/SeleccionLibros.jsx";
import Tienda from "./paginas/Tienda/Tienda";
import Catalogo from "./paginas/Catalogo/Catalogo.jsx";
import ProtectedRoute from "./componentes/ProtectedRoutes";
import IntercambioHome from "./paginas/IntercambioHome/IntercambioHome.jsx";
import ChatRoom from "./componentes/chatRoom/ChatRoom.jsx";
import ChatList from "./componentes/ChatList/ChatList.jsx";
import UserProfile from "./paginas/UserProfile/UserProfile";


function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* para rutas publicas */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* para rutas protegidas */}
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute>
              <Catalogo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tienda"
          element={
            <ProtectedRoute>
              <Tienda />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intercambioHome"
          element={
            <ProtectedRoute>
              <IntercambioHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatRoom/:numRoom"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatList" 
          element={
            <ProtectedRoute>
              <ChatList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
