import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header.jsx";
import { LoadError } from "./pages/LoadError.jsx";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";

export const SeacrhContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SeacrhContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SeacrhContext.Provider>
    </div>
  );
}

export default App;
