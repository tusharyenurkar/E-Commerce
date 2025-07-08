import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      alert("Product deleted!");
      fetchProducts(); // Refresh list
    } catch (error) {
      alert("Failed to delete product");
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/products/edit/${id}`); // ✅ Redirect to edit page
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 All Products (Admin)</h2>
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.description}</p>
          <p><strong>ID:</strong> {product._id}</p>

          <button
            onClick={() => handleDelete(product._id)}
            style={{ color: "red", marginRight: "10px" }}
          >
            Delete
          </button>

          <button
            onClick={() => handleEdit(product._id)}
            style={{ color: "blue" }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProductList;
