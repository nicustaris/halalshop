/* eslint-disable react/prop-types */

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { store } from "../../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { GetAddressCard } from "./GetAddressCard";

function GetAddr({ passAddress }) {
  const cookies = new Cookies();
  const [address, setAddress] = useState([]);
  const user = cookies.get("email");
  const navigate = useNavigate();
  useEffect(() => {
    getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user))
    ).then((data) => {
      const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setAddress(result[0].addresses);
      console.log(result[0].addresses);
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
      <h3>Please choose a delivery Address</h3>
      <div>
        {address.map((address) => (
          <GetAddressCard
            key={address.index}
            addressline1={address.addressline1}
            addressline2={address.addressline2}
            county={address.county}
            city={address.city}
            code={address.postalcode}
            getAddress={getAddress}
          />
        ))}
      </div>
      <h3>Set another address?</h3>
      <button onClick={addressRedirect}>Proceed</button>
    </div>
  );
}

export { GetAddr };
