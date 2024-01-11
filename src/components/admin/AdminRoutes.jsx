import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersManagement from "./UsersManagement";
import ProductsManagement from "./ProductsManagement";
import PromotionProductsManagement from "./PromotionProductsManagement";
import ShowcaseManagement from "./ShowcaseManagement";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/UsersManagement" element={<UsersManagement />} />
      <Route path="/ProductsManagement" element={<ProductsManagement />} />
      <Route
        path="/PromotionsManagement"
        element={<PromotionProductsManagement />}
      />
      <Route path="/ShowcaseManagement" element={<ShowcaseManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
