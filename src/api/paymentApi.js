// paymentApi.js
export const realizarPago = async (paymentData) => {
    const response = await fetch("http://localhost:4000/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData)
    });
    return response.json();
};
// paymentApi.js
export const verDatos = async (paymentData) => {
    const response = await fetch("http://localhost:4000/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData)
    });
    return response.json();
};

