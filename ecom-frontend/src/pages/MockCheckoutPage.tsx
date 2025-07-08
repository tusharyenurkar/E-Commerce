import React, { useEffect, useState } from "react";
import axios from "axios";

// 🛒 Product Interface
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

const MockCheckoutPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  // 🧾 Handle Mock Payment
  const handleMockPayment = async () => {
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);
    alert("⏳ Redirecting to mock payment...");

    setTimeout(async () => {
      alert("✅ Mock Payment Successful");

      const orderPayload = {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        })),
        customer: {
          name: "Test User",
          email: "test@example.com",
          phone: "9999999999",
          address: "123 Demo Street, India"
        },
        total: calculateTotal()
      };

      try {
        await axios.post("http://localhost:5000/orders", orderPayload);
        alert("📦 Order placed successfully!");

        localStorage.removeItem("cart");
        setCart([]);
      } catch (err) {
        alert("❌ Failed to place order");
        console.error(err);
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Checkout Page</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name} - ₹{item.price} × {item.quantity || 1}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{calculateTotal()}</h3>
          <button onClick={handleMockPayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now (Mock)"}
          </button>
        </>
      )}
    </div>
  );
};

export default MockCheckoutPage;
 