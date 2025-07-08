import React from "react";
import { Link } from "react-router-dom";

function ConfirmationPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>✅ Order Placed Successfully!</h2>
      <p>Thank you for shopping with us.</p>
      <Link to="/">
        <button style={{ marginTop: "20px" }}>Back to Home</button>
      </Link>
    </div>
  );
}

export default ConfirmationPage;
