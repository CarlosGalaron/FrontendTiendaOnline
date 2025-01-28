import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import './Tienda.css';
import TarjetaCesta from '../../componentes/TarjetaCesta/TarjetaCesta';

function Tienda() {
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {

    if (!sessionStorage.getItem('idUsuario')) {
      window.location.href = '/login';
  } 
    
    // Recupera la lista de libros desde localStorage al cargar la página
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartBooks(storedCart);
  }, []);

  // Función para eliminar un libro por ISBN
  const removeFromCart = (isbn) => {
    const updatedCart = cartBooks.filter(book => book.ISBN !== isbn); // Filtra los no coincidentes (ISBN)
    setCartBooks(updatedCart); // Actualiza el estado local
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualiza el localStorage
  };

  return (
    <div className='father-tienda'>
      <Header />
      <div className='tienda-cesta'>
        {cartBooks.length > 0 ? (
          cartBooks.map((book) => (
            <TarjetaCesta key={book.ISBN} book={book} onRemove={removeFromCart} /> // Iteramos por pedido
          ))
        ) : (
          <p>La cesta está vacía</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Tienda;