import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import "./PromotionManagementProductView.css";
import { toast } from "react-toastify";

const PromotionManagementProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { promotions, updatePromotionProduct } = useProductsContext();

  useEffect(() => {
    const selectedProduct = promotions.find((p) => p.id === productId);
    setProduct(selectedProduct);
  }, [productId, promotions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSave = () => {
    updatePromotionProduct(productId, product);
    toast.success("Product saved successfully!");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {product && (
          <div className="product-item">
            <img
              src={product.imageURL}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price-view">
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    className="promotions-view-edit"
                  />
                </label>
              </div>
              <div className="product-discount">
                <label>
                  Discount %:
                  <input
                    type="number"
                    name="discount"
                    value={product.discount}
                    onChange={handleInputChange}
                    className="promotions-view-edit"
                  />
                </label>
              </div>
              <div className="product-price-discount">{`Discounted Price: ${
                product.price - (product.price * product.discount) / 100
              }£ per ${product.unit}`}</div>
            </div>
            <div className="button-container">
              <button className="view-offer-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionManagementProductView;
