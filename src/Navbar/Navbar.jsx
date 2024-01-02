/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, store } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const Navbar = () => {
  const cookies = new Cookie();
  const [loggedIn, setLoggedIn] = useState(true);
  const [value, setValue] = useState("");
  const [displayResult, setDisplayResult] = useState([]);
  const email = cookies.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setLoggedIn((prevState) => !prevState);
    }
  }, [email]);

  function Logout() {
    signOut(auth)
      .then(() => {
        console.log("Sign out done!");
      })
      .catch((error) => {
        console.log(error);
      });
    cookies.remove("firstname");
    cookies.remove("lastname");
    cookies.remove("email");
    cookies.remove("providerId");

    navigate("/");
    window.location.reload(true);
  }
  async function onChange(e) {
    setValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
    await getDocs(collection(store, "products")).then((data) => {
      const resultdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (value === "") {
        setDisplayResult(resultdata);
      } else {
        setDisplayResult([]);
      }
    });
  }

  return (
    <nav className="navbar">
      <div className="align_center">
        <img src={logo} alt="logo" />
        <div className="align_center navbar_form">
          <input
            type="text"
            placeholder="Search Products"
            className="navbar_search"
            onChange={onChange}
            value={value}
          />
          <Link to="/ProductList" state={{ productName: value }}>
            <button type="submit" className="search_button">
              Search
            </button>
          </Link>
          <div className="dropdown-content">
            {displayResult
              .filter((elm) => elm.name.startsWith(value))
              .map((el) => (
                <div key={el.id} onClick={() => setValue(el.name)}>
                  {el.name}
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="align_center navbar_links">
        <Link to="/">Home</Link>
        <Link to="/Products">Products</Link>
        <Link to="/Promotions">Special Offers</Link>
        <Link to="/About Us">About Us</Link>
        <Link to="/Cart">Cart</Link>
        {loggedIn ? (
          <div>
            <Link to="/SignUp">Sign Up</Link>
            <Link to="/SignIn">Sign In</Link>
          </div>
        ) : (
          <div>
            <Link to="" onClick={Logout}>
              Sign Out
            </Link>
            <Link to="/Profile">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
