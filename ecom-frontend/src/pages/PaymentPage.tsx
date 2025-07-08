import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate payment success
    alert("✅ Payment Successful!");
    localStorage.removeItem("cart");
    navigate("/confirmation");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>💳 Payment Page</h2>
      <p>Click the button below to simulate a successful payment.</p>
      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
