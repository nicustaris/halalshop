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

const App = () => {
  return (
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
    </Routes>
  );
};

export { App };
