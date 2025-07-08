import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Define Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity?: number;
}

function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = existingCart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
