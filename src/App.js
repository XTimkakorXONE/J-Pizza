import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { LoadError } from "./pages/LoadError.jsx";
import { Cart } from "./pages/Cart";
import { FullPizza } from "./pages/FullPizza";
import "./scss/app.scss";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="items/:id" element={<FullPizza />} />
        <Route path="*" element={<LoadError />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
