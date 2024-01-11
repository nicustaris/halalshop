import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ResetPassword } from "./pages/ResetPassword";
import { Showcase } from "./pages/Showcase";
import { Products } from "./pages/Products";
import { ProductList } from "./pages/ProductList";
import { ProductsCart } from "./pages/ProductsCart";
import { Checkout } from "./pages/Checkout";
import { Promotions } from "./pages/Promotions";
import { Succes } from "./pages/Succes";
import { Failure } from "./pages/Failure";

import { ProductsProvider } from "./context/ProductsContext";
import { UsersProvider } from "./context/UsersContext";

import MainAdminPanel from "./components/admin/MainAdminPanel";
import UsersManagement from "./components/admin/UsersManagement";
import ProductsManagement from "./components/admin/ProductsManagement";
import UserProfileView from "./components/admin/UserProfileView";
import PromotionManagement from "./components/admin/PromotionManagement";
import ShowcaseManagement from "./components/admin/ShowcaseManagement";
import PromotionManagementProductView from "./components/admin/PromotionManagementProductView";
import CategoryManagement from "./components/admin/CategoryManagement";
import OrdersHistory from "./components/admin/OrdersHistory";

const App = () => {
  return (
    <UsersProvider>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/ResetPassword" element={<ResetPassword />}></Route>
          <Route path="/Showcase" element={<Showcase />}></Route>
          <Route path="/Products" element={<Products />}></Route>
          <Route path="/ProductList" element={<ProductList />}></Route>
          <Route path="/Cart" element={<ProductsCart />}></Route>
          <Route path="/Checkout" element={<Checkout />}></Route>
          <Route path="/Failure" element={<Failure />}></Route>
          <Route path="/Succes" element={<Succes />}></Route>
          <Route path="/Promotions" element={<Promotions />}></Route>
          {/* Admin Routes */}
          <Route path="/Admin" element={<MainAdminPanel />}></Route>
          <Route
            path="/Admin/UsersManagement"
            element={<UsersManagement />}
          ></Route>
          <Route
            path="/Admin/UsersManagement/:userEmail"
            element={<UserProfileView />}
          ></Route>
          <Route
            path="/Admin/ProductsManagement"
            element={<ProductsManagement />}
          ></Route>
          <Route
            path="/Admin/PromotionManagement"
            element={<PromotionManagement />}
          ></Route>
          <Route
            path="/Admin/PromotionManagement/:productId"
            element={<PromotionManagementProductView />}
          ></Route>
          <Route
            path="/Admin/CategoryManagement"
            element={<CategoryManagement />}
          ></Route>
          <Route
            path="/Admin/ShowcaseManagement"
            element={<ShowcaseManagement />}
          ></Route>
          <Route
            path="/Admin/OrdersHistory"
            element={<OrdersHistory />}
          ></Route>
        </Routes>
      </ProductsProvider>
    </UsersProvider>
  );
};

export { App };
