/* eslint-disable react/prop-types */
import Cookies from "universal-cookie";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { store } from "../../firebase";
import classes from "./CheckoutCard.module.css";

function CheckoutCard(props) {
  const cookies = new Cookies();
  async function removeItem(item) {
    let obj = {
      productName: item.name,
      productPrice: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    };

    let itemRef = doc(store, "usercart", cookies.get("cartid"));
    await updateDoc(itemRef, { products: arrayRemove(obj) })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <tr className={classes.container}>
      <td className={classes.td}>
        <img src={props.imageUrl} className={classes.tdimg}></img>
      </td>
      <td className={classes.td}>{props.name}</td>
      <td className={classes.td}>{props.quantity}</td>
      <td className={classes.td}>£{props.price}</td>
      <td className={classes.td}>£{props.subtotal}</td>

      <td className={classes.td}>
        <button onClick={() => removeItem(props)} className={classes.removebtn}>
          <img src="/delete.svg" style={{ width: "25px" }} />
        </button>
      </td>
    </tr>
  );
}
export { CheckoutCard };
