import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the structure of each cart item
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (index: number, amount: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={item._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", paddingBottom: "10px" }}>
              <h4>{item.name}</h4>
              <p>₹{item.price} x {item.quantity}</p>
              <div>
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
                <button onClick={() => removeItem(index)} style={{ marginLeft: "10px", color: "red" }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
