import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NavBar } from "./components/NavBar";
import FavoritesPage from "./Pages/FavoritesPage";

const App = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
