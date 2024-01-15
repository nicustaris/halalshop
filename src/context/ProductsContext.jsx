import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { store, storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const ProductsContext = createContext();

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

const fetchDataFromCollection = async (collectionRef) => {
  try {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log(error);
  }
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const productsCollection = collection(store, "products");
  const categoriesCollection = collection(store, "categories");
  const promotionsCollection = collection(store, "promotions");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchDataFromCollection(productsCollection);
        const categoriesData = await fetchDataFromCollection(
          categoriesCollection
        );
        const promotionsData = await fetchDataFromCollection(
          promotionsCollection
        );
        setProducts(productsData);
        setCategories(categoriesData);
        setPromotions(promotionsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const docRef = await addDoc(productsCollection, newProduct);
      const productId = docRef.id;
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: productId, ...newProduct },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    const productRef = doc(productsCollection, productId);
    await updateDoc(productRef, updatedProduct);

    setProducts((prevProduct) =>
      prevProduct.id === updatedProduct.id
        ? { ...prevProduct, updatedProduct }
        : prevProduct
    );
  };

  const deleteProduct = async (productId) => {
    try {
      const productRef = doc(productsCollection, productId);
      await deleteDoc(productRef);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addPromotionProduct = async (newProduct) => {
    try {
      const imageRef = ref(storage, `images/${newProduct.name}_${Date.now()}`);
      await uploadBytes(imageRef, newProduct.imageURL);
      const imageURL = await getDownloadURL(imageRef);

      const docRef = await addDoc(promotionsCollection, {
        ...newProduct,
        imageURL: imageURL,
      });
      const productId = docRef.id;
      setPromotions((prevProducts) => [
        ...prevProducts,
        { id: productId, ...newProduct, imageURL: imageURL },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePromotionProduct = async (productId, updatedProduct) => {
    try {
      const productRef = doc(promotionsCollection, productId);
      await updateDoc(productRef, updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePromotionProduct = async (productId) => {
    const productRef = doc(promotionsCollection, productId);
    try {
      await deleteDoc(productRef);
      setPromotions((prevProduct) =>
        prevProduct.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const imageRef = ref(
        storage,
        `images/${newCategory.categoryName}_${Date.now()}`
      );
      await uploadBytes(imageRef, newCategory.imageUrl);
      const imageUrl = await getDownloadURL(imageRef);

      const categoryRef = await addDoc(categoriesCollection, {
        ...newCategory,
        imageUrl: imageUrl,
      });
      const categoryId = categoryRef.id;
      setCategories((prevCategory) => [
        ...prevCategory,
        { id: categoryId, ...newCategory, imageUrl: imageUrl },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (categoryId, updatedCategory) => {
    try {
      const productRef = doc(categoriesCollection, categoryId);
      await updateDoc(productRef, updatedCategory);
      setCategories((prevCategory) =>
        prevCategory.map((category) =>
          category.id === categoryId
            ? { ...category, ...updatedCategory }
            : category
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const categoryRef = doc(categoriesCollection, categoryId);
      await deleteDoc(categoryRef);
      setCategories((prevCategory) =>
        prevCategory.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    promotions,
    addPromotionProduct,
    updatePromotionProduct,
    deletePromotionProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  };
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
