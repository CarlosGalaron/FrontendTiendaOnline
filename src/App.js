import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Homepage from './paginas/Homepage/Homepage';
import Login from './paginas/Login/Login';
import Registro from './paginas/Registro/Registro';
import SeleccionLibros from './paginas/SeleccionLibros/SeleccionLibros';
import LibrosIntercambio from './paginas/LibrosIntercambio/LibrosIntercambio';
import Intercambio from './paginas/Intercambiar/Intercambiar.jsx';
import Tienda from './paginas/Tienda/Tienda';
import Catalogo from './paginas/Catalogo/Catalogo.jsx';
import ProtectedRoute from './componentes/ProtectedRoutes.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* para rutas publicas */}
      <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* <Route path="/catalogo" element={<Catalogo />} /> */}
        {/* <Route path="/tienda" element={<Tienda />} /> */}
        {/* <Route path="/Seleccion" element={<SeleccionLibros />} /> */}
        {/* <Route path="/biblioteca" element={<LibrosIntercambio />} /> */}
        {/* <Route path="/intercambio/:ISBN/:tipo" element={<Intercambio />} /> */}

        {/* para rutas protegidas */}
        <Route path="/catalogo" element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
        <Route path="/tienda" element={<ProtectedRoute><Tienda /></ProtectedRoute>} />
        <Route path="/Seleccion" element={<ProtectedRoute><SeleccionLibros /></ProtectedRoute>} />
        <Route path="/biblioteca" element={<ProtectedRoute><LibrosIntercambio /></ProtectedRoute>} />
        <Route path="/intercambio/:ISBN/:tipo" element={<ProtectedRoute><Intercambio /></ProtectedRoute>} />


      </Routes>
    </Router>
  );
}   

export default App;
