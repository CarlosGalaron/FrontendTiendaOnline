import "./Pago.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { realizarPago } from "../../api/paymentApi";

function Pago({ totalCompra, totalBooks }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Función para redirigir a la página de Tienda
  const handleLogoClick = () => {
    navigate('/catalogo'); // Ir a la vista de catalogo
  };

  const pagar = async () => {
    // Verificar que todos los campos tengan datos
    if (!accountNumber || !cvc || !cardExpiry || !email || !deliveryAddress) {
      alert('Por favor, rellene todos los datos.');
      return;
    }
  
    // Preparamos el objeto de pago con el precio fijo de $10 por libro.
    const paymentData = {
      total_books: totalBooks,
      total_amount: totalCompra,
      account_number: accountNumber,
      cvc: cvc,
      card_expiry: cardExpiry,
      email: email,
      delivery_address: deliveryAddress
    };
  
    const data = await realizarPago(paymentData);
    if (data.payment) {
      setStatus(`Pago Ejecutado. Id: ${data.payment.id}`);
      alert('Pago realizado con éxito');
      // Espera 2 segundos y redirige a la Tienda
      setTimeout(() => {
        handleLogoClick();
      }, 2000);
    } else {
      setStatus("Error al procesar el pago");
      alert('Pago rechazado');
    }
  };
  
  return (
    <div className="payment-container">
      <h2>Simulación de Pago</h2>
      <p>
        Total a pagar: ${totalCompra.toFixed(2)} (Precio fijo: $10 por libro)
      </p>
      <p>Cantidad de libros: {totalBooks}</p>
      <div className="field">
        <label>Número de cuenta:</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="field">
        <label>CVC:</label>
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Fecha de expiración:</label>
        <input
          type="text"
          value={cardExpiry}
          onChange={(e) => setCardExpiry(e.target.value)}
          placeholder="MM/YY"
        />
      </div>
      <div className="field">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Dirección de entrega:</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>
      <button onClick={pagar}>Confirmar Pago</button>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Pago;
