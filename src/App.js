//app.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./paginas/Homepage/Homepage";
import Login from "./paginas/Login/Login";
import Registro from "./paginas/Registro/Registro";
import Seleccion from "./paginas/SeleccionLibros/SeleccionLibros.jsx";
import LibrosIntercambio from "./paginas/LibrosIntercambio/LibrosIntercambio";
import Intercambio from "./paginas/Intercambiar/Intercambiar.jsx";
import Tienda from "./paginas/Tienda/Tienda";
import Catalogo from "./paginas/Catalogo/Catalogo.jsx";
import ProtectedRoute from "./componentes/ProtectedRoutes";
import IntercambioHome from "./paginas/IntercambioHome/IntercambioHome.jsx";
import ChatRoom from "./componentes/chatRoom/ChatRoom.jsx";
import ChatList from "./componentes/ChatList/ChatList.jsx";
import MisMatches from "./componentes/misMatches/MisMatches.jsx";
import UserProfile from "./paginas/UserProfile/UserProfile";


function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* para rutas publicas */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {<Route path="/catalogo" element={<Catalogo />} />}
        <Route path="/IntercambioHome" element={<IntercambioHome />} />
        <Route path="/MisMatches" element={<MisMatches />} />

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
          path="/seleccion"
          element={
            <ProtectedRoute>
              <Seleccion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biblioteca"
          element={
            <ProtectedRoute>
              <LibrosIntercambio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intercambio/:ISBN/:tipo"
          element={
            <ProtectedRoute>
              <Intercambio />
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
