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
  let totalPrice = 0;
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <h1>Products Cart</h1>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th>Image</th>
              <th className={classes.th}>Product Name</th>
              <th className={classes.th}>Quantity</th>
              <th className={classes.th}>Price</th>
              <th className={classes.th}>Subtotal</th>
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
        <h2>Total : {parseFloat(totalPrice).toFixed(2)}£</h2>
        <button onClick={checkout} className={classes.checkout}>
          Checkout
        </button>
      </div>
      {modal && <Modal hideModal={hideModal} />}
    </div>
  );
}

export { ProductsCart };
