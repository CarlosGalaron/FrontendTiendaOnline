import React, { useEffect, useState } from "react";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import "./Catalogo.css";
import { getBooks } from "../../api/bookApi"; // Ahora usa el endpoint /catalog

function Catalogo() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartBooks, setCartBooks] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title"); // "title", "author" o "genre"

  // Obtiene el listado de libros del catálogo desde el backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Recupera la cesta almacenada en localStorage (si existe)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartBooks(storedCart);
  }, []);

  const handleBookClick = (book) => {
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
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...currentCart, book];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartBooks(updatedCart);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Filtra los libros según el término de búsqueda y el campo seleccionado
  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();
    if (searchField === "title") {
      return book.title.toLowerCase().includes(search);
    } else if (searchField === "author") {
      return book.author.toLowerCase().includes(search);
    } else if (searchField === "genre") {
      return book.genre && book.genre.toLowerCase().includes(search);
    }
    return true;
  });

  // Organiza los libros filtrados en filas de 8 elementos
  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 8) {
    rows.push(filteredBooks.slice(i, i + 8));
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
                <li key={index}>{book.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="Catalogo-body">
        <div className="catalog-header">
        <div className="search-bar-container">
          <div className="criteria-selector">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="title">Título</option>
              <option value="author">Autor</option>
              <option value="genre">Género</option>
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder={`Buscar por ${searchField === "title" ? "título" : searchField === "author" ? "autor" : "género"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
          <button className="toggle-cart-button" onClick={toggleCartVisibility}>
            {isCartVisible ? "Ocultar Cesta" : "Mostrar Cesta"}
          </button>
          
        </div>
        {isLoading ? (
          <p>Cargando libros...</p>
        ) : (
          <div className="image-grid">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((book, index) => (
                  <div
                    key={book.id || index}
                    className="image-item"
                    onClick={() => handleBookClick(book)}
                  >
                    <img
                      src={book.image || "/placeholder.jpg"}
                      alt={book.title || `Libro ${index + 1}`}
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
                <img
                  src={selectedBook.image || "/placeholder.jpg"}
                  alt={selectedBook.title}
                />
              </div>
              <div className="modal-info">
                <h2>{selectedBook.title}</h2>
                <p>
                  <strong>Autor:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>Género:</strong> {selectedBook.genre}
                </p>
                {selectedBook.ISBN && (
                  <p>
                    <strong>ISBN:</strong> {selectedBook.ISBN}
                  </p>
                )}
                {selectedBook.book_state && (
                  <p>
                    <strong>Estado:</strong> {selectedBook.book_state}
                  </p>
                )}
              </div>
              <div className="modal-buttons">
                <button
                  onClick={() => {
                    handleAddToCart(selectedBook);
                    closeModal();
                  }}
                >
                  Añadir a cesta
                </button>
              </div>
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Catalogo;
