import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminPage from "./pages/AdminPage";
import AdminProductList from "./pages/AdminProductList";
import EditProduct from "./pages/EditProduct";
import MockCheckoutPage from "./pages/MockCheckoutPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/checkout" element={<MockCheckoutPage />} />


        
      </Routes>
    </Router>
  );
}

export default App;
