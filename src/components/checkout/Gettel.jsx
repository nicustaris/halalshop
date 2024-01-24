/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { store } from "../../firebase";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import classes from "./checkout.module.css";

function Gettel({ passPhone }) {
  const [telephone, setTelephone] = useState("");

  const cookies = new Cookies();
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
      setTelephone(result[0].telephone);
    });
  }, []);

  function handlePhone() {
    navigate("/Profile", { state: { previousUrl: "/Checkout" } });
  }

  return (
    <div className={classes.container}>
      <h1>Delivery Information</h1>
      {telephone ? (
        <>
          <em>Contact Information</em>
          <input
            type="text"
            defaultValue={`${user}`}
            readOnly
            disabled={true}
          />
          <input
            type="text"
            defaultValue={`${telephone}`}
            readOnly
            disabled={true}
          />
          <em>Are the details correct?</em>
          <button
            onClick={() => {
              passPhone(telephone);
            }}
            className={classes.btn}
          >
            Yes
          </button>
          <button
            onClick={handlePhone}
            className={`${classes.btn} ${classes.btnNo}`}
          >
            No
          </button>
        </>
      ) : (
        <h3>
          You have no phone set.<button onClick={handlePhone}>Set Phone</button>
        </h3>
      )}
    </div>
  );
}

export { Gettel };
