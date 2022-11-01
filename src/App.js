import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header.jsx";
import { LoadError } from "./pages/LoadError.jsx";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<LoadError />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
