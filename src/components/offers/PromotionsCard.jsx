/* eslint-disable react/prop-types */
import { useState } from "react";
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import { store } from "../../firebase";

function PromotionsCard(props) {
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
    <div>
      <div>{props.discount}%</div>
      <div>Discount</div>
      <div>{props.name}</div>
      <div>{parseFloat((props.price * props.discount) / 100).toFixed(2)}£</div>
      <div>{props.unit}</div>
      <img src={props.imageUrl} alt=""></img>
      <div>
        <button onClick={decrement}>-</button>
        <p>{quantity}</p>
        <button onClick={increment}>+</button>
      </div>
      <button
        onClick={() =>
          addProduct(
            props.name,
            parseFloat((props.price * props.discount) / 100).toFixed(2),
            quantity
          )
        }>
        Add To bascket
      </button>
      <p>{alert}</p>
    </div>
  );
}

export { PromotionsCard };
