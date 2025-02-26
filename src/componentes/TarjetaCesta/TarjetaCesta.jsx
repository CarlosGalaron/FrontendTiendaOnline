import React from "react";
import "./TarjetaCesta.css";

function TarjetaCesta({ book, onRemove }) {
  return (
    <div className="tarjeta-cesta">
      {book.image && (
        <img src={book.image} alt={book.title} className="book-image" />
      )}
      <div className="tarjeta-cesta-body">
      <div className="tarjeta-cesta-info">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      </div>
      <div className="tarjeta-cesta-button">
      <button onClick={() => onRemove(book.ISBN)}>Eliminar</button>
      </div>
      </div>
    </div>
  );
}

export default TarjetaCesta;
