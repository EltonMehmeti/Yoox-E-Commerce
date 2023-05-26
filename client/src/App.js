import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Postman from "./components/admin/Postman";
import Category from "./components/admin/Category";
import Delivery from "./components/admin/Delivery";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import SingleProduct from "./components/SingleProduct";

import Chat from "./components/Chat";
import ChatComponent from "./components/admin/ChatComponent";
import CartProvider, { CartContext } from "./pages/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/users" element={<Users />} />
            <Route path="/postman" element={<Postman />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category" element={<Category />} />
            <Route path="/costumerS" element={<ChatComponent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </Router>
      </CartProvider>
      {/* <Delivery progress={31} /> */}
    </>
  );
}

export default App;
