import React from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useUsersContext } from "../../context/UsersContext";
import "./ShowcaseManagement.css";

const ShowcaseManagement = () => {
  const { showcases, removeShowcase } = useUsersContext();

  const handleRemoveShowcase = (id) => {
    removeShowcase(id);
  };

  return (
    <div>
      <Navbar />
      <div className="container showcase-container">
        {showcases.length > 0
          ? showcases.map((showcase) => (
              <div key={showcase.id} className="showcase-item">
                <img
                  src={showcase.imageURL}
                  alt={showcase.name}
                  className="showcase-image"
                />
                <div className="showcase-details">
                  <div className="showcase-name">{showcase.name}</div>
                  <div className="showcase-title">{showcase.title}</div>
                  <div className="showcase-description">
                    {showcase.description}
                  </div>
                  <button
                    className="remove-showcase-btn"
                    onClick={() => handleRemoveShowcase(showcase.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          : "There are not any showcase records available"}
      </div>
    </div>
  );
};

export default ShowcaseManagement;
