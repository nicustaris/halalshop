/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  updateDoc,
  doc,
  arrayRemove,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { store } from "../../firebase";
import Cookies from "universal-cookie";
import classes from "./AddressCard.module.css";

function AddressCard(props) {
  const [deletemodal, setDeleteModal] = useState(false);
  const cookies = new Cookies();
  const user = cookies.get("email");
  function openDeleteModal() {
    setDeleteModal(true);
  }
  function closeDeleteModal() {
    setDeleteModal(false);
  }

  async function deleteAddress(addresstoDelete) {
    const deleteAddress = {
      addressline1: addresstoDelete.addressline1,
      addressline2: addresstoDelete.addressline2,
      city: addresstoDelete.city,
      county: addresstoDelete.county,
      postalcode: addresstoDelete.code,
    };

    getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user))
    ).then(async (data) => {
      const result = data.docs.map((docc) => ({
        ...docc.data(),
        id: docc.id,
      }));

      const addressRef = doc(store, "usersdetails", result[0].id);
      await updateDoc(addressRef, { addresses: arrayRemove(deleteAddress) })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <div className={classes.container}>
      <div>{props.addressline1}</div>
      <div>{props.addressline2}</div>
      <div>{props.city}</div>
      <div>{props.county}</div>
      <div>{props.code}</div>

      <button onClick={openDeleteModal} className={classes.button}>
        Delete
      </button>
      {deletemodal && (
        <div>
          <p>Are you sure you want to delete this address?</p>
          <button
            onClick={() => deleteAddress(props)}
            className={classes.button}>
            Yes
          </button>
          <button onClick={closeDeleteModal} className={classes.button}>
            No
          </button>
        </div>
      )}
    </div>
  );
}
export { AddressCard };
