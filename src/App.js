import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NavBar } from "./components/NavBar";
import FavoritesPage from "./Pages/FavoritesPage";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
