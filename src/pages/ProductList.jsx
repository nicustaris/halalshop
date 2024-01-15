/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { store } from "../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import { ProductCard } from "../components/product/ProductCard";
import { Navbar } from "../Navbar/Navbar";
import classes from "./ProductList.module.css";

function ProductList() {
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (!location.state.category) {
      search(location.state.productName);
    } else {
      getDocs(
        query(
          collection(store, "products"),
          where("category", "==", location.state.category)
        )
      ).then((data) => {
        const resultdata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(resultdata);
        let subcategory = resultdata.map(function (sub) {
          return sub.subcategory;
        });

        setSubcategories(Array.from(new Set(subcategory)));
        setDisplayProducts(
          resultdata.filter((prod) => prod.subcategory === subcategory[0])
        );
      });
    }
  }, []);

  function getProducts(sub) {
    setDisplayProducts(products.filter((prod) => prod.subcategory === sub));
  }

  async function search(param) {
    console.log(param);
    getDocs(
      query(
        collection(store, "products"),
        where("name", "==", location.state.productName)
      )
    ).then(async (data) => {
      const result = data.docs.map((docc) => ({
        ...docc.data(),
        id: docc.id,
      }));
      console.log(result);
      setDisplayProducts(result);
    });
  }
  return (
    <div>
      <Navbar searchvalue={search} />
      <div className={classes.container}>
        <h1 className={classes.title}>Products List</h1>

        <div className={classes.subcontainer}>
          {subcategories.map((sub, index) => (
            <p
              key={index}
              onClick={() => getProducts(sub)}
              className={classes.subcategories}
            >
              {sub}
            </p>
          ))}
        </div>

        <div className={classes.productcontainer}>
          {displayProducts.map((prod, index) => (
            <ProductCard
              key={index}
              name={prod.name}
              price={prod.price}
              unit={prod.unit}
              imageUrl={prod.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export { ProductList };
