/* eslint-disable react/prop-types */
import { useState } from "react";
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import { store } from "../../firebase";

import "./PromotionsCard.css";
import { toast } from "react-toastify";

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

  async function addProduct(name, price, quantity, imageUrl) {
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
            imageUrl: imageUrl,
          },
        ],
      });
    } else {
      let productRef = doc(store, "usercart", cookies.get("cartid"));
      const result = await getDoc(productRef);

      let check = result
        ?.data()
        ?.products?.find((element) => element.productName === name);

      if (check) {
        setAlert("Product already added to your cart");
        toast.warning("Product already added to your cart");
      } else {
        await updateDoc(productRef, {
          products: arrayUnion({
            productName: name,
            productPrice: price,
            quantity: parseInt(quantity),
            imageUrl: imageUrl,
          }),
        });
        toast.success("Product added successfully!");
      }
    }
  }

  return (
    <div className="promotions-card">
      <div className="discount">{props.discount}%</div>
      <div className="discount-label">Discount</div>
      <div className="product-details">
        <div className="product-name">{props.name}</div>
        <div className="discounted-price">
          {parseFloat((props.price * props.discount) / 100).toFixed(2)}£
        </div>
        <div className="unit">{props.unit}</div>
      </div>
      <img className="product-image" src={props.imageUrl} alt="" />
      <div className="quantity-control">
        <button onClick={decrement}>-</button>
        <p>{quantity}</p>
        <button onClick={increment}>+</button>
      </div>
      <button
        className="add-to-basket"
        onClick={() =>
          addProduct(
            props.name,
            parseFloat((props.price * props.discount) / 100).toFixed(2),
            quantity,
            props.imageUrl
          )
        }
      >
        Add To Basket
      </button>
      <p className="alert">{alert}</p>
    </div>
  );
}

export { PromotionsCard };
