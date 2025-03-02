// Tienda.jsx
import React, { useEffect, useState } from "react";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import "./Tienda.css";
import TarjetaCesta from "../../componentes/TarjetaCesta/TarjetaCesta";
import Pago from "../../componentes/Pago/Pago"; // Importa el componente de pago

function Tienda() {
  const [cartBooks, setCartBooks] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    // Recupera la lista de libros desde localStorage al cargar la página
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartBooks(storedCart);
  }, []);

  // Función para eliminar un libro por ISBN
  const removeFromCart = (isbn) => {
    const updatedCart = cartBooks.filter((book) => book.ISBN !== isbn);
    setCartBooks(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calcular el total de la compra: precio fijo de $10 por libro.
  const totalBooks = cartBooks.length;
  const totalCompra = totalBooks * 10;

  return (
    <div className="father-tienda">
      <Header />
      <div className="tienda-cesta">
      
        {cartBooks.length > 0 ? (
          <>  
            <div className="tienda-carts">
            {cartBooks.map((book) => (
              <TarjetaCesta
                key={book.ISBN}
                book={book}
                onRemove={removeFromCart}
              />
            ))}
            </div>
            <div className="total-compra">
              <h3>Total: ${totalCompra.toFixed(2)}</h3>
              {!showPayment && (
                <button onClick={() => setShowPayment(true)}>
                  Proceder al Pago
                </button>
              )}
            
            {showPayment && (
              <div className="payment-form">
                <Pago totalCompra={totalCompra} totalBooks={totalBooks} />
              </div>
            )}
            </div>
          </>
        ) : (
          <p>La cesta está vacía</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Tienda;
