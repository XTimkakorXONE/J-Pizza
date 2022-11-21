import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import LoadError from "./pages/LoadError";
import "./scss/app.scss";
import { MainLayout } from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/*webpackChunkName: 'Cart'*/ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/*webpackChunkName: 'FullPizza'*/ "./pages/FullPizza")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="items/:id"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route path="*" element={<LoadError />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
