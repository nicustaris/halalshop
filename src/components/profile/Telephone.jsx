import { store } from "../../firebase";

import { useState, useEffect, useRef } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import classes from "./Telephone.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function Telephone() {
  const telephoneInput = useRef();
  const [telephone, setTelephone] = useState("");
  const [notPresent, setNotPresent] = useState(false);
  const [present, setPresent] = useState(false);
  const [alert, setAlert] = useState("");
  const location = useLocation();

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
      console.log(result[0].telephone);
      setTelephone(result[0].telephone);
    });

    if (!telephone) {
      setNotPresent(false);
      setPresent(true);
    } else {
      setNotPresent(true);
      setPresent(false);
    }
  }, []);

  async function addTelNumber() {
    if (telephoneInput.current.value.match("[0-9]{11}")) {
      await getDocs(
        query(collection(store, "usersdetails"), where("email", "==", user))
      ).then(async (data) => {
        const result = data.docs.map((docc) => ({
          ...docc.data(),
          id: docc.id,
        }));

        const telRef = doc(store, "usersdetails", result[0].id);
        await updateDoc(telRef, { telephone: telephoneInput.current.value });
        setAlert("Phone Number Successfully Added");

        if (location.state === null) {
          window.location.reload();
        } else {
          navigate(location.state.previousUrl);
        }
      });
    } else {
      setAlert("Please provide valid phone number");
    }
  }
  async function changeTelNumber() {
    if (telephoneInput.current.value.match("[0-9]{11}")) {
      await getDocs(
        query(collection(store, "usersdetails"), where("email", "==", user))
      ).then(async (data) => {
        const result = data.docs.map((docc) => ({
          ...docc.data(),
          id: docc.id,
        }));

        const telRef = doc(store, "usersdetails", result[0].id);
        await updateDoc(telRef, { telephone: telephoneInput.current.value });
        setAlert("Phone Number Changed Successfully");

        if (location.state === null) {
          window.location.reload();
        } else {
          navigate(location.state.previousUrl);
        }
      });
    } else {
      setAlert("Please provide valid phone number");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Telephone</div>
      <div className={classes.card}>
        {present && (
          <div>
            <p>Your telephone number is: {telephone}</p>
            <br />
            <input
              type="tel"
              ref={telephoneInput}
              pattern="^[0-9]{11}$"
              placeholder="1234-567-6789"
            />
            <button onClick={changeTelNumber} className={classes.button}>
              Change Tel. Number
            </button>
          </div>
        )}
      </div>
      <div className={classes.card}>
        {notPresent && (
          <div>
            <p>You don`t have any telephone number set</p>
            <br />
            <input
              type="tel"
              ref={telephoneInput}
              pattern="^[0-9]{11}$"
              placeholder="1234-567-6789"
            />
            <button onClick={addTelNumber} className={classes.button}>
              Add Telephone Number
            </button>
          </div>
        )}
      </div>
      <br />
      <p>{alert}</p>
    </div>
  );
}

export { Telephone };
