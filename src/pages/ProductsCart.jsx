import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { getDoc, doc } from "firebase/firestore";
import { store } from "../firebase";
import { Navbar } from "../Navbar/Navbar";
import { CheckoutCard } from "../components/product/CheckoutCard";
import classes from "./ProductsCart.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Modal } from "../components/product/Modal";

function ProductsCart() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  const cookies = new Cookies();
  const user = cookies.get("email");
  const navigate = useNavigate();
  let totalPrice = 0;

  useEffect(() => {
    getdocument();
  }, []);

  async function getdocument() {
    const docRef = doc(store, "usercart", cookies.get("cartid"));
    const document = await getDoc(docRef);
    const resultdata = document.data();

    setProducts(resultdata.products);
  }

  function checkout() {
    if (auth.currentUser === null) {
      setModal(true);
    } else {
      navigate("/Checkout");
    }
  }

  function hideModal() {
    setModal(false);
  }

  const handleRedirect = () => {
    navigate("/SignIn", { state: { previousUrl: "/Cart" } });
  };

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <h1>My Cart</h1>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th className={classes.subtotal}>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => {
              totalPrice += prod.productPrice * prod.quantity;
              return (
                <CheckoutCard
                  key={index}
                  imageUrl={prod.imageUrl}
                  name={prod.productName}
                  quantity={prod.quantity}
                  price={prod.productPrice}
                  subtotal={parseFloat(
                    prod.quantity * prod.productPrice
                  ).toFixed(2)}
                />
              );
            })}
          </tbody>
        </table>
        <h4>TOTAL: {parseFloat(totalPrice).toFixed(2)}£</h4>
        {user ? (
          <button onClick={checkout} className={classes.checkout}>
            Proceed to Checkout
          </button>
        ) : (
          <em>
            You must to <strong onClick={handleRedirect}>Sign In</strong> in
            order to complete your order!
          </em>
        )}
      </div>
      {modal && <Modal hideModal={hideModal} />}
    </div>
  );
}

export { ProductsCart };
