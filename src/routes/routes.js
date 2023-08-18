import React from "react";
import { Route, Routes } from "react-router-dom";

import Products from "../pages/Products";
import About from "../pages/About";
import CreateEditProduct from "../pages/CreateEditProduct";
import Statistics from "../pages/Statistics";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/statistics" element={<Statistics />} />

      <Route path="/edit" element={<CreateEditProduct />} />
      <Route path="/create" element={<CreateEditProduct />} />
    </Routes>
  );
};

export default PublicRoutes;
