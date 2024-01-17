import React, { useState } from "react";
import { toast } from "react-toastify";
import { useProductsContext } from "../../context/ProductsContext";

const ProductContainer = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [editableProduct, setEditableProduct] = useState(true);

  const { updateProduct, deleteProduct } = useProductsContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdate = async () => {
    setEditableProduct(true);
    try {
      await updateProduct(product.id, editedProduct);
      toast.success("Product successfully updated!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Product successfully deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product_container">
      <div className="product_info">
        <img src={product.imageUrl} className="product_image" />
      </div>
      <div className="product_info">
        <label>Name</label>
        <input
          onChange={handleChange}
          value={editedProduct.name}
          type="text"
          name="name"
          disabled={editableProduct}
        />
      </div>
      <div className="product_info">
        <label>Price</label>
        <input
          onChange={handleChange}
          type="text"
          name="price"
          value={editedProduct.price}
          disabled={editableProduct}
        />
      </div>
      <div className="product_info product_category">
        <label>Category</label>
        <select
          onChange={handleChange}
          disabled={editableProduct}
          name="category"
        >
          <option value={editedProduct.category}>
            {editedProduct.category}
          </option>
        </select>
      </div>

      <div className="product_info">
        <label>Unit</label>
        <select onChange={handleChange} disabled={editableProduct} name="unit">
          <option value={editedProduct.unit}>{editedProduct.unit}</option>
          <option value={editedProduct.unit === "kg" ? "piece" : "kg"}>
            {editedProduct.unit === "kg" ? "piece" : "kg"}
          </option>
        </select>
      </div>
      <div className="product_info">
        <label>Edit</label>
        {editableProduct ? (
          <button onClick={() => setEditableProduct(false)}>Edit</button>
        ) : (
          <button onClick={handleUpdate}>Save</button>
        )}
      </div>
      <div className="product_info">
        <label>Delete</label>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {editedProduct.category === "Meat" && (
        <div className="product_info">
          <label>Subcategory</label>
          <select
            onChange={handleChange}
            disabled={editableProduct}
            name="subcategory"
          >
            <option value={editedProduct.subcategory}>
              {editedProduct.subcategory}
            </option>
            <option
              value={
                editedProduct.subcategory === "Chicken" ? "Lamb" : "Chicken"
              }
            >
              {editedProduct.subcategory === "Chicken" ? "Lamb" : "Chicken"}
            </option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
