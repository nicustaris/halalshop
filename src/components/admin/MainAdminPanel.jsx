import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";

import "./MainAdminPanel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";

const MainAdminPanel = () => {
  return (
    <div>
      <Navbar />
      <h1 className="admin_title">Content Management System (CMS)</h1>
      <div className="admin_container">
        <Link to="/Admin/UsersManagement">
          <div className="box">
            <FontAwesomeIcon icon={faUser} />
            Users Management
          </div>
        </Link>
        <Link to="/Admin/ProductsManagement">
          <div className="box">
            <FontAwesomeIcon icon={faList} />
            Products Management
          </div>
        </Link>

        <Link to="/Admin/PromotionManagement">
          <div className="box">
            <FontAwesomeIcon icon={faPercentage} />
            Promotion Products Management
          </div>
        </Link>
        <Link to="/Admin/CategoryManagement">
          <div className="box">
            <FontAwesomeIcon icon={faBook} />
            Category Management
          </div>
        </Link>
        <Link to="/Admin/ShowcaseManagement">
          <div className="box">
            <FontAwesomeIcon icon={faCamera} />
            Showcase Management
          </div>
        </Link>
        <Link to="/Admin/OrdersHistory">
          <div className="box">
            <FontAwesomeIcon icon={faBookReader} />
            Orders History
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainAdminPanel;
