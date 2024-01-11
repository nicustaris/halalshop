import React, { useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useProductsContext } from "../../context/ProductsContext";
import "./CategoryManagement.css";
import { toast } from "react-toastify";

const CategoryManagement = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useProductsContext();
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryImage, setEditedCategoryImage] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const handleEditCategory = (categoryId, currentName, currentImage) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(currentName);
    setEditedCategoryImage(currentImage);
  };

  const handleSaveCategory = (categoryId) => {
    updateCategory(categoryId, {
      categoryName: editedCategoryName,
      imageUrl: editedCategoryImage,
    });
    setEditingCategoryId(null);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "" || newCategoryImage === null) {
      toast.error("Please fill all required fields!");
      return;
    }

    const newCategory = {
      categoryName: newCategoryName,
      imageUrl: newCategoryImage,
    };

    addCategory(newCategory);

    setNewCategoryName("");
    setNewCategoryImage("");
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="category-heading">Category Management</h2>

        <div className="add-category">
          <h3>Add New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="add-input"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewCategoryImage(e.target.files[0])}
            className="add-input"
          />

          <button className="add-button" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>

        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              {editingCategoryId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={editedCategoryImage}
                    onChange={(e) => setEditedCategoryImage(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    className="save-button"
                    onClick={() => handleSaveCategory(category.id)}
                  >
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="category-name">{category.categoryName}</span>
                  <img
                    src={category.imageUrl}
                    alt={category.categoryName}
                    className="category-image"
                  />
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEditCategory(
                        category.id,
                        category.categoryName,
                        category.imageUrl
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManagement;
