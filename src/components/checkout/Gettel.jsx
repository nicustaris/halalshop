/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { store } from "../../firebase";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Telephone Number</h1>
      {telephone ? (
        <>
          <h3>{telephone} Is this telephone number correct?</h3>
          <button
            onClick={() => {
              passPhone(telephone);
            }}
          >
            Yes
          </button>
          <button onClick={handlePhone}>No</button>
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
