import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Type for a cart item
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// ✅ Type for customer details
interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems,
      customer,
      total,
    };

    try {
      await axios.post("http://localhost:5000/orders", orderData);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Total: ₹{total}</h3>
          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
}

export default CheckoutPage;
