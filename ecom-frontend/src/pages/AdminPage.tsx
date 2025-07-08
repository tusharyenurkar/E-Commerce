import React, { useState } from "react";
import axios from "axios";

function AdminPage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/products", {
        ...product,
        price: parseFloat(product.price)
      });

      alert("✅ Product added!");
      setProduct({ name: "", price: "", image: "", description: "" });
    } catch (err) {
      alert("❌ Failed to add product");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>🛠️ Admin Panel - Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input name="price" type="number" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input name="image" value={product.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPage;
