import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product";
import Edit from "./components/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
