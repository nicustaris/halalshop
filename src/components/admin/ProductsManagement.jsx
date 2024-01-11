import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useProductsContext } from "../../context/ProductsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ProductsManagement.css";
import ProductContainer from "./ProductContainer";
import ProductTable from "./ProductTable";

const ProductsManagement = () => {
  const { products, categories, addProduct } = useProductsContext();
  const [subCategory, setSubCategory] = useState(null);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    unit: "",
  });

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Price", accessor: "price" },
    { Header: "Category", accessor: "category" },
    { Header: "Subcategory", accessor: "subcategory" },
    { Header: "Unit", accessor: "unit" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" && value === "Meat") {
      setSubCategory(true);
    } else if (name === "category" && value !== "Meat") {
      setSubCategory(false);
    }
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.unit
    ) {
      toast.error("Please fill in all required fields.");
      setError("Please fill in all required fields.");
      return;
    }

    addProduct(newProduct);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      subcategory: "",
      unit: "",
    });
    toast.success("Product added successfully!");
    setError("");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Products Management</h1>
        <div className="adding-product-wrapper">
          {error && <em style={{ color: "#ff0000" }}>{error}</em>}
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />

          <label className="label label-currency">Price</label>
          <input
            type="text"
            className="input"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />

          <label className="label">Category</label>
          <select
            className="input"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          >
            <option value="">Choose</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          {subCategory && (
            <>
              <label className="label">Subcategory</label>
              <select
                className="input"
                name="subcategory"
                value={newProduct.subcategory}
                onChange={handleInputChange}
              >
                <option value="">Choose</option>
                <option value="Chicken">Chicken</option>
                <option value="Lamb">Lamb</option>
              </select>
            </>
          )}

          <label className="label">Unit</label>
          <select
            className="input"
            name="unit"
            value={newProduct.unit}
            onChange={handleInputChange}
          >
            <option value="">Choose</option>
            <option value="kg">kg</option>
            <option value="piece">piece</option>
          </select>

          <button className="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
      <div className="products_display">
        <h2>Edit Products</h2>
        {products.map((product) => (
          <ProductContainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
