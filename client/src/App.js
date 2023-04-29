import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "../src/img/logo1.png";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
function App() {
  return (
    <>
      <Header />
      <Home />
      <AboutUs />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
