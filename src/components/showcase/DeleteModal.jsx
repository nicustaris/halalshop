/* eslint-disable react/prop-types */
import classes from "./DeleteModal.module.css";
import { storage, store } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
function DeleteModal({ props, hideDeleteModal }) {
  function deletePost() {
    const fileRef = ref(storage, props.imageURL);
    const showcaseRef = doc(store, "usersshowcase", props.id);
    deleteObject(fileRef);
    deleteDoc(showcaseRef).then(() => {
      window.location.reload();
    });
  }
  return (
    <div className={classes.container} onClick={props.hideDeleteModal}>
      <h2>Are you sure you want to delete this post?</h2>
      <div>
        <button onClick={deletePost} className={classes.submitBtn}>
          Confirm
        </button>
        <button onClick={hideDeleteModal} className={classes.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export { DeleteModal };
