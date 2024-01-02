import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { store } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function Failure() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  function backToCheckout() {
    navigate("/Checkout");
  }
  function backToHome() {
    const cartRef = doc(store, "ordershistory", cookies.get("cartid"));
    deleteDoc(cartRef).then(() => {
      navigate("/");
    });
  }
  return (
    <>
      {" "}
      <h3>Your Check out was unsuccesful</h3>
      <button onClick={backToCheckout}>Try Again</button>
      <button onClick={backToHome}>Cancel</button>
    </>
  );
}

export { Failure };
