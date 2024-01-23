/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Gettel } from "../components/checkout/Gettel";
import { Navbar } from "../Navbar/Navbar";
import { GetAddr } from "../components/checkout/GetAddr";
import { collection, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import { store } from "../firebase";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

import classes from "./Checkout.module.css";

function Checkout() {
  const [phone, setPhone] = useState(true);
  const [address, setAddress] = useState(false);
  const [total, setTotal] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [displayAddress, setDisplayAddress] = useState([]);
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();
  let totalPrice = 0;

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("email")) {
      navigate("/");
    }
    getdocument();
  }, []);

  async function getdocument() {
    const docRef = doc(store, "usercart", cookies.get("cartid"));
    const document = await getDoc(docRef);
    const resultdata = document.data();
    setProducts(resultdata.products);
  }

  function passPhone(telephone) {
    setTelephone(telephone);
    setPhone(false);
    setAddress(true);
    setTotal(false);
  }

  function passAddress(addressline1, addressline2, county, city, code) {
    setDisplayAddress([addressline1, addressline2, county, city, code]);
    setPhone(false);
    setAddress(false);
    setTotal(true);
  }

  async function onApprove(price) {
    var productList = [];
    products.forEach((el) => {
      var sub = el.productPrice * el.quantity;
      Object.assign(el, { subtotal: parseFloat(sub).toFixed(2) });
      productList.push(el);
    });
    addDoc(collection(store, "ordershistory"), {
      order: {
        telephone: telephone,
        email: cookies.get("email"),
        address: displayAddress,
        products: productList,
        total: parseFloat(price).toFixed(2),
        paymentMethod: "PayPal",
        paymentTime: new Date(),
      },
    }).then(() => {
      const cartRef = doc(store, "usercart", cookies.get("cartid"));
      deleteDoc(cartRef).then(() => {
        cookies.remove("cartid");
        navigate("/Succes");
      });
    });
  }

  function onError(err) {
    console.log(err);
    navigate("/Failure");
  }

  const initialOptions = {
    clientId:
      "AWUBTk7hCT3BcVa1LablTM_Owp71Rhwjg0pqrX5_meo7WQHW_6CALU4cr9RdkZdk0GiSPekO2WNGGAm9",
    currency: "GBP",
    intent: "capture",
  };

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        {phone && <Gettel passPhone={passPhone} />}
        {address && <GetAddr passAddress={passAddress} />}
        {total && (
          <div>
            {telephone}
            {displayAddress.map((el, index) => (
              <ul key={index}>
                <li>{el}</li>
              </ul>
            ))}
            {products.map((product, index) => {
              totalPrice += product.productPrice * product.quantity;
              return (
                <ul key={index}>
                  <li>{product.productName}</li>
                  <li>{product.quantity}</li>
                  <li>{product.productPrice}</li>
                  <li>
                    Subtotal:
                    {parseFloat(
                      product.productPrice * product.quantity
                    ).toFixed(2)}
                  </li>
                </ul>
              );
            })}
            <h3>Total ={parseFloat(totalPrice).toFixed(2)} </h3>

            <div
              style={{
                width: "300px",
              }}
            >
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  style={{
                    layout: "vertical",

                    shape: "pill",

                    label: "paypal",
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: "Grocery Bascket from Hafiz Halal",
                          amount: {
                            currency_code: "GBP",
                            value: parseFloat(totalPrice).toFixed(2),
                          },
                        },
                      ],
                      application_context: {
                        shipping_preference: "NO_SHIPPING",
                      },
                    });
                  }}
                  onApprove={() => onApprove(totalPrice)}
                  onError={onError}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export { Checkout };
