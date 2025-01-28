import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import "./Intercambiar.css";

function Intercambio() {
  const { ISBN } = useParams();
  const location = useLocation();
  const [libro, setLibro] = useState(null); 
  const [coincidencias, setCoincidencias] = useState([]);
  const [error, setError] = useState(null);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {

    if (!sessionStorage.getItem('idUsuario')) {
      window.location.href = '/login';
  } 

    const fetchLibros = async () => {
      try {
        // Cargar usuario1.json, usuario2.json y LibrosJson.json
        const [usuario1Response, usuario2Response, librosResponse] = await Promise.all([
          fetch("/json/usuario1.json"),
          fetch("/json/usuario2.json"),
          fetch("/json/LibrosJson.json"),
        ]);

        if (!usuario1Response.ok || !usuario2Response.ok || !librosResponse.ok) {
          throw new Error("Error al cargar los archivos JSON");
        }

        const usuario1Data = await usuario1Response.json();
        const usuario2Data = await usuario2Response.json();
        const librosData = await librosResponse.json();

        // Encontrar el libro principal por ISBN de la URL
        const libroPrincipal = librosData.find((libro) => libro.ISBN === ISBN);
        setLibro(libroPrincipal);

        // Check the last part of the URL to determine if it is 'libreria' or 'pedido'
        const isPedido = location.pathname.includes('pedido');
        const querer = isPedido ? usuario2Data.querer || [] : usuario1Data.querer || [];
        const propios = isPedido ? usuario1Data.propios || [] : usuario2Data.propios || [];

        // Encontrar ISBN coincidentes entre usuario1 y usuario2
        const isbnCoincidentes = propios
          .filter((propio) => querer.some((querido) => querido.ISBN === propio.ISBN))
          .map((libro) => libro.ISBN);

        const librosCoincidentes = librosData.filter((libro) =>
          isbnCoincidentes.includes(libro.ISBN)
        );

        setCoincidencias(librosCoincidentes); 
        console.log(librosCoincidentes.length);
        if (librosCoincidentes.length > 1) {
          setIsMatch(true);
        } else {
          setIsMatch(false); 
        }

      } catch (error) {
        setError(error.message);
      }
    };

    fetchLibros();
  }, [ISBN, location]); 

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!libro) {
    return <p>Cargando libro principal...</p>;
  }

  return (
    <div className="intercambio-container">
      <Header />
      <h1 className="intercambio-title">Intercambio</h1>

      <div className="intercambio-content">
        {/* Libro principal siempre visible */}
        <div className="main-book-card">
          <img src={libro.imagen} alt={libro.nombre} />
          <div className="book-info">
            <h2 className="book-title">{libro.nombre}</h2>
            <p className="book-author">{libro.autor}</p>
          </div>
        </div>

        {/* Contenido Condicional */}
        {isMatch ? (
          <div className="book-list">
            {coincidencias.map((book, index) => (
              <div className="list-item" key={index}>
                <div className="book-info">
                  <h2 className="book-title">{book.nombre}</h2>
                  <p className="book-author">{book.autor}</p>
                </div>
                <div className="action-btn accept">✔</div>
              </div>
            ))}
          </div>
        ) : (<>
            <div className="actions">
                <div className="action-btn accept">✔</div>
                <div className="action-btn swap">↔</div>
                <div className="action-btn reject">✖</div>
            </div>

            {/* Show the first book from the coincidencias array */}
            {coincidencias.length > 0 && (
                <div className="main-book-card">
                <img src={coincidencias[0].imagen} alt={coincidencias[0].nombre} />
                <div className="book-info">
                    <h2 className="book-title">{coincidencias[0].nombre}</h2>
                    <p className="book-author">{coincidencias[0].autor}</p>
                </div>
                </div>
            )}
        </>
        )}
    </div>

    <Footer />
    </div>
);
}

export default Intercambio;
