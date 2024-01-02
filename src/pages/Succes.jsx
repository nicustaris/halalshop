import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Succes() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  function backToProducts() {
    navigate("/Products");
  }
  return (
    <>
      <h3>
        {cookies.get("firstname")} {cookies.get("lastname")} Your order was
        successfully placed
      </h3>
      <button onClick={backToProducts}>Back to Products</button>
    </>
  );
}

export { Succes };
