/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

function Modal({ hideModal }) {
  const navigate = useNavigate();
  function redirectLogin() {
    navigate("/SignIn", { state: { previousUrl: "/Checkout" } });
  }
  return (
    <div className={classes.container}>
      <h2>To continue you must be Logged In</h2>
      <h3>Redirect to Login page</h3>
      <div>
        <button onClick={redirectLogin} className={classes.button}>
          OK
        </button>
        <button className={classes.button} onClick={hideModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export { Modal };
