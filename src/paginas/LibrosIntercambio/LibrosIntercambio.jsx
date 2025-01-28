import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import "./LibrosIntercambio.css";

function LibrosIntercambio() {
  const [libreria, setLibreria] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    
      if (!sessionStorage.getItem('idUsuario')) {
        window.location.href = '/login';
    } 


    const fetchLibros = async () => {
      try {
        const response1 = await fetch("/json/usuario1.json");
        const response2 = await fetch("/json/usuario2.json");

        if (!response1.ok || !response2.ok) {
          throw new Error("Error al cargar los archivos JSON");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        const propios = data1.propios || [];
        const querer = data1.querer || [];
        const darUsuario2 = data2.propios || [];
        const quererUsuario2 = data2.querer || [];

        // Calcular libros de librería con coincidencias
        const librosLibreria = propios.map((libro) => {
          const coincidencias = quererUsuario2.filter((l) => l.ISBN === libro.ISBN).length;
          return { ...libro, coincidencias };
        });

        // Calcular libros de pedidos con coincidencias
        const librosPedidos = querer.map((libro) => {
          const coincidencias = darUsuario2.filter((l) => l.ISBN === libro.ISBN).length;
          return { ...libro, coincidencias };
        });

        setLibreria(librosLibreria);
        setPedidos(librosPedidos);
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar los JSON:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibros();
  }, []);

  if (isLoading) {
    return <p>Cargando libros...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="libros-intercambio">
      <Header />

      <main className="libros-contenedor">
        {/* Sección Librería */}
        <div className="seccion">
          <h2>Librería</h2>
          <div className="grid">
            {libreria.map((libro, index) => (
              <div
                className="cuadro"
                key={`libreria-${index}`}
                onClick={() =>  libro.coincidencias > 0 && navigate(`/intercambio/${libro.ISBN}/libreria`)}
              >
              
                <div className="imagen-contenedor">
                  <img src={libro.imagen} alt={libro.nombre} />
                  {libro.coincidencias > 0 && (
                    <span className="coincidencia">{libro.coincidencias}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección Pedidos */}
        <div className="seccion">
          <h2>Pedidos</h2>
          <div className="grid">
            {pedidos.map((libro, index) => (
              <div
                className="cuadro"
                key={`pedidos-${index}`}
                onClick={() => libro.coincidencias > 0 && navigate(`/intercambio/${libro.ISBN}/pedido`)} 
              >
                <div className="imagen-contenedor">
                  <img src={libro.imagen} alt={libro.nombre} />
                  {libro.coincidencias > 0 && (
                    <span className="coincidencia">{libro.coincidencias}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LibrosIntercambio;
