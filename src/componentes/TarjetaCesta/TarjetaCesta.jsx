import React from "react";
import "./TarjetaCesta.css";

function TarjetaCesta({ book, onRemove }) {
  return (
    <div className="tarjeta-cesta">
      {book.image && (
        <img src={book.image} alt={book.title} className="book-image" />
      )}
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onRemove(book.ISBN)}>Eliminar</button>
    </div>
  );
}

export default TarjetaCesta;
