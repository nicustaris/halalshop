/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./ProductCard.module.css";
import Cookies from "universal-cookie";
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { store } from "../../firebase";

function ProductCard(props) {
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState("");

  const cookies = new Cookies();

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  function increment() {
    setQuantity(quantity + 1);
  }
  async function addProduct(name, price, quantity) {
    let productid = btoa(Math.random()).slice(0, 20);

    if (!cookies.get("cartid")) {
      cookies.set("cartid", productid, {
        path: "/",
        maxAge: 24 * 3600,
        secure: true,
        sameSite: "none",
      });

      await setDoc(doc(store, "usercart", cookies.get("cartid")), {
        products: [
          {
            productName: name,
            productPrice: price,
            quantity: parseInt(quantity),
          },
        ],
      });
    } else {
      let productRef = doc(store, "usercart", cookies.get("cartid"));
      const result = await getDoc(productRef);

      let check = result
        .data()
        .products.find((element) => element.productName === name);
      if (check) {
        setAlert("products already added to your cart");
      } else {
        await updateDoc(productRef, {
          products: arrayUnion({
            productName: name,
            productPrice: price,
            quantity: parseInt(quantity),
          }),
        });
      }
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.proddetails}>
        <p>{props.name}</p>
        <div className={classes.price}>
          <p className={classes.p}>{props.price}</p>
          <p className={classes.p}>£/</p>
          <p className={classes.p}>{props.unit}</p>
        </div>
      </div>
      <div className={classes.buttoncontainer}>
        <button onClick={decrement} className={classes.button}>
          -
        </button>
        <p className={classes.p}>{quantity}</p>
        <button onClick={increment} className={classes.button}>
          +
        </button>
      </div>
      <div className={classes.img}>
        <img
          src="/cart_icon.jpg"
          width={23}
          height={23}
          onClick={() => addProduct(props.name, props.price, quantity)}></img>
      </div>
      <p>{alert}</p>
    </div>
  );
}

export { ProductCard };
