import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    description: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then((res) => {
        const found = res.data.find((p: any) => p._id === id);
        if (found) setProduct(found);
        else alert("Product not found");
      })
      .catch((err) => console.error("Failed to load product", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        ...product,
        price: parseFloat(product.price as any),
      });
      alert("✅ Product updated!");
      navigate("/admin/products");
    } catch (error) {
      alert("❌ Failed to update product");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>✏️ Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input name="image" value={product.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
