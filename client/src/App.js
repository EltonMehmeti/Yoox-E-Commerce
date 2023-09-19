import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/client/SignUp";
import SignIn from "./pages/client/SignIn";
import Home from "./pages/client/Home";
import Admin from "./pages/admin/Admin";
import Contact from "./pages/client/Contact";
import Postman from "./components/admin/Postman";
import Category from "./components/admin/Category";
import Delivery from "./components/admin/Delivery";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import AboutUs from "./pages/client/AboutUs";
import SingleProduct from "./components/SingleProduct";
import ChatComponent from "./components/admin/ChatComponent";
import CartProvider, { CartContext } from "./pages/client/CartContext";

import Payments from "./components/admin/Payments";
import OrderCancelled from "./components/OrderCancelled";
import SuccessfulPayment from "./components/SuccessfulPayment";
import ShippingPostman from "./components/admin/ShippingPostman";
import TrackOrders from "./components/TrackOrders";
import AllProducts from "./pages/client/AllProducts";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminTable from "./components/admin/AdminTable";
import PMLogin from "./pages/postman/PMLogin";
import PMSignup from "./pages/postman/PMSignup";
import MapComponent from "./MapComponent";
import AgentLogin from "./pages/cs/AgentLogin";
import AgentSignUp from "./pages/cs/AgentSignup";
import Agent from "./components/admin/Agent";

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
            <Route path="/agent" element={<Agent />} />
            <Route path="/agentDash" element={<ChatComponent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminregister" element={<AdminSignup />} />
            <Route path="/pmlogin" element={<PMLogin />} />
            <Route path="/pmregister" element={<PMSignup />} />
            <Route path="/agentlogin" element={<AgentLogin />} />
            <Route path="/agentsignup" element={<AgentSignUp />} />

            <Route path="/admintable" element={<AdminTable />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<ShippingPostman />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/trackorder" element={<TrackOrders />} />

            <Route path="/orders" element={<Payments />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/cancel" element={<OrderCancelled />} />
            <Route path="/success" element={<SuccessfulPayment />} />
          </Routes>
        </Router>
      </CartProvider>
      <MapComponent />
    </>
  );
}

export default App;
