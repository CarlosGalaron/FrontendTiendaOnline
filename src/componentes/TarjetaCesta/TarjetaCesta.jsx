import React, { useEffect, useState } from 'react';
import './TarjetaCesta.css';

const TarjetaCesta = ({ book, onRemove }) => {
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const fetchCartBooks = async () => {
      // Recupera los ISBNs guardados
      const cartISBNs = JSON.parse(localStorage.getItem('cart')) || [];

      try {
        const response = await fetch('/json/LibrosJson.json');
        const allBooks = await response.json();

        // Filtra los libros que coinciden con los ISBNs de la cesta
        const booksInCart = allBooks.filter(book => cartISBNs.includes(book.ISBN));
        setCartBooks(booksInCart);
      } catch (error) {
        console.error('Error al cargar libros:', error);
      }
    };

    fetchCartBooks();
  }, []);

  return (
    <div className="cesta-father">
			<div className='cesta-container'>
				<img className='cesta-pic' src={book.imagen} alt={book.nombre} />
				<div className="cesta-info">
					<h3>{book.nombre}</h3>
					<p><strong>Autor:</strong> {book.autor}</p>
					<p><strong>Género:</strong> {book.genero}</p>
					<p><strong>ISBN:</strong> {book.ISBN}</p>
					<button onClick={() => onRemove(book.ISBN)} className="cesta-remove-button">
          	Eliminar de la cesta
        	</button>
				</div>
			</div>
      
    </div>
  );
};


export default TarjetaCesta;