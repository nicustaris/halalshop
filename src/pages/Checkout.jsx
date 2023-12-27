import { useState, useEffect } from "react";
import { Gettel } from "../components/checkout/Gettel";
import { Navbar } from "../Navbar/Navbar";
import { GetAddr } from "../components/checkout/GetAddr";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import { store } from "../firebase";

function Checkout() {
  const [phone, setPhone] = useState(true);
  const [address, setAddress] = useState(false);
  const [total, setTotal] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [displayAddress, setDisplayAddress] = useState([]);
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();
  let totalPrice = 0;

  useEffect(() => {
    getdocument();
  }, []);

  async function getdocument() {
    const docRef = doc(store, "usercart", cookies.get("cartid"));
    const document = await getDoc(docRef);
    const resultdata = document.data();
    console.log(resultdata.products);
    setProducts(resultdata.products);
  }

  function passPhone(telephone) {
    console.log(telephone);
    setTelephone(telephone);
    setPhone(false);
    setAddress(true);
    setTotal(false);
  }
  function passAddress(addressline1, addressline2, county, city, code) {
    console.log(addressline1, addressline2, county, city, code);
    setDisplayAddress([addressline1, addressline2, county, city, code]);
    setPhone(false);
    setAddress(false);
    setTotal(true);
  }
  return (
    <div>
      <Navbar />

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
                <li>Subtotal:{product.productPrice * product.quantity}</li>
              </ul>
            );
          })}
          <h3>Total ={totalPrice} </h3>
          <button>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}
export { Checkout };
