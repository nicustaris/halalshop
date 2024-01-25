/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

import { DeleteModal } from "./DeleteModal";
import classes from "./PostItem.module.css";
import Cookies from "universal-cookie";

function PostItem(props) {
  const [deleteButton, setDeleteButton] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const cookies = new Cookies();
  const user = cookies.get("email");

  useEffect(() => {
    if (user !== props.email) {
      setDeleteButton(false);
    } else {
      setDeleteButton(true);
    }
  }, []);

  function showDeleteModal() {
    setDeleteModal(true);
  }

  function hideDeleteModal() {
    setDeleteModal(false);
  }

  return (
    <fieldset className={classes.container}>
      <legend className={classes.name}>{props.name}</legend>
      <div className={classes.text}>
        <div className={classes.title}>{props.title}</div>

        <div className={classes.description}>{props.description}</div>
      </div>
      <img src={props.imageURL} className={classes.image}></img>
      {deleteButton && (
        <button onClick={showDeleteModal} className={classes.removeBtn}>
          Delete This Post
        </button>
      )}
      {deleteModal && (
        <DeleteModal hideDeleteModal={hideDeleteModal} props={props} />
      )}
      <br />
    </fieldset>
  );
}

export { PostItem };
