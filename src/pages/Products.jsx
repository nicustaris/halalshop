import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { store } from "../firebase";
import classes from "./Products.module.css";
import { Navbar } from "../Navbar/Navbar";

import { Link } from "react-router-dom";

function Products() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getDocs(collection(store, "categories")).then((data) => {
      const resultdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setImages(resultdata);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        {images.map((image) => (
          <div key={image.id} className={classes.item}>
            <p>{image.categoryName}</p>
            <Link to="/ProductList" state={{ category: image.categoryName }}>
              <img src={image.imageUrl} alt="" className={classes.image}></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Products };
