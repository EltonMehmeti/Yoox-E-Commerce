import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Postman from "./components/Postman";
import Category from "./components/Category";

import Products from "./components/Products";
import Users from "./components/Users";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import SingleProduct from "./components/SingleProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="/users" element={<Users />} />
          <Route path="/postman" element={<Postman />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
