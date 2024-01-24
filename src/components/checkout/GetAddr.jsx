/* eslint-disable react/prop-types */

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { store } from "../../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { GetAddressCard } from "./GetAddressCard";

import classes from "./checkout.module.css";

function GetAddr({ passAddress }) {
  const cookies = new Cookies();
  const [address, setAddress] = useState([]);
  const user = cookies.get("email");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user))
    ).then((data) => {
      const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAddress(result[0].addresses);
    });
  }, []);

  function getAddress(addressline1, addressline2, county, city, code) {
    passAddress(addressline1, addressline2, county, city, code);
  }

  function addressRedirect() {
    navigate("/Profile", { state: { previousUrl: "/Checkout" } });
  }

  return (
    <div>
      <h1 style={{ marginBottom: "15px" }}>Delivery Information</h1>
      {address.length > 0 ? (
        <div>
          {address.map((address, index) => (
            <GetAddressCard
              key={index}
              addressline1={address.addressline1}
              addressline2={address.addressline2}
              county={address.county}
              city={address.city}
              code={address.postalcode}
              getAddress={getAddress}
            />
          ))}
        </div>
      ) : (
        <h3>You have no Delivery Address set</h3>
      )}
      <div className={classes.newaddress}>Set another address?</div>
      <button
        onClick={addressRedirect}
        className={`${classes.btn} ${classes.btnchangeaddress}`}
      >
        Proceed
      </button>
    </div>
  );
}

export { GetAddr };
