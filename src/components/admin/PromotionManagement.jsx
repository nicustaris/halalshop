import React, { useState } from "react";

import "./PromotionManagement.css";
import { Navbar } from "../../Navbar/Navbar";
import { useProductsContext } from "../../context/ProductsContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./PromotionManagementProductView.css";

const ProductContainer = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(5);
  const [unit, setUnit] = useState("kg");
  const [selectedImage, setSelectedImage] = useState(null);

  const { promotions, addPromotionProduct, deletePromotionProduct } =
    useProductsContext();

  const handleAddProduct = () => {
    if (!productName || !price || !discount || !unit || !selectedImage) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      discount: parseFloat(discount),
      unit,
      imageURL: selectedImage,
    };

    addPromotionProduct(newProduct);

    // Reset states to default
    setProductName("");
    setPrice("");
    setUnit("kg");
    setSelectedImage(null);

    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (productId) => {
    deletePromotionProduct(productId);
  };

  return (
    <div>
      <Navbar />
      <div className="add-product-container">
        <h2>Add Promotions Product</h2>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Discount (%):
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>
        <label>
          Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="unit">unit</option>
          </select>
        </label>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            className="add-image-button"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </label>
        <button className="add-button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
      <div className="product-container">
        {promotions.map((product) => (
          <div key={product.id} className="product-item">
            <div className="discount">{product.discount}% Discount</div>
            <img
              src={product.imageURL}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price">{`${product.price}£`}</div>
              <div className="product-price-discount">{`${
                product.price - (product.price * product.discount) / 100
              }£ per ${product.unit}`}</div>
              <Link to={`/Admin/PromotionManagement/${product.id}`}>
                <button className="view-offer-btn">Edit offer</button>
              </Link>

              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="view-offer-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default ProductContainer;
