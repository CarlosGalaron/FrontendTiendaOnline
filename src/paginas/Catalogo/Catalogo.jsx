import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import './Catalogo.css';

function Catalogo() {
  const isLoggedIn = sessionStorage.getItem('idUsuario');

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartBooks, setCartBooks] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/json/LibrosJson.json');
        if (!response.ok) {
          throw new Error('Error al cargar el JSON');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error al cargar el JSON:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartBooks(storedCart);
  }, []);

  const handleImageClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleAddToCart = (book) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...currentCart, book];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartBooks(updatedCart); 
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const rows = [];
  for (let i = 0; i < images.length; i += 8) {
    rows.push(images.slice(i, i + 8));
  }

  return (
    <div className="Catalogo-father">
      <Header />
      {isCartVisible && (
        <div className="cart-box">
          <h3>Cesta</h3>
          {cartBooks.length === 0 ? (
            <p>No hay libros en la cesta.</p>
          ) : (
            <ul>
              {cartBooks.map((book, index) => (
                <li key={index}>{book.nombre}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="Catalogo-body">
      <div className="catalog-header">
          <button className="toggle-cart-button" onClick={toggleCartVisibility}>
            {isCartVisible ? 'Ocultar Cesta' : 'Mostrar Cesta'}
          </button>
        </div>
        {isLoading ? (
          <p>Cargando imágenes...</p>
        ) : (
          <div className="image-grid">
            
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((image, index) => (
                  <div
                    key={index}
                    className="image-item"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.imagen}
                      alt={image.nombre || `Imagen ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {selectedBook && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-image">
                <img src={selectedBook.imagen} alt={selectedBook.nombre} />
              </div>
              <div className="modal-info">
                <h2>{selectedBook.nombre}</h2>
                <p><strong>Autor:</strong> {selectedBook.autor}</p>
                <p><strong>Género:</strong> {selectedBook.genero}</p>
                <p><strong>ISBN:</strong> {selectedBook.ISBN}</p>
              </div>
              <div className="modal-buttons">
                <button onClick={() =>  { 
                    handleAddToCart(selectedBook); 
                    closeModal(); 
                }}>
                  Añadir a cesta
                </button>
              </div>
              <button className="close-button" onClick={closeModal}>X</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Catalogo;
