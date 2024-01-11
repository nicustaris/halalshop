import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";

import { useUsersContext } from "../../context/UsersContext";
import "./UsersManagement.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const UsersManagement = () => {
  const { users, deleteUser } = useUsersContext();
  const [userSearch, setUserSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch) ||
      user.email.toLowerCase().includes(userSearch)
  );

  const handleUserClick = (email) => {
    const encodeEmail = btoa(email);
    navigate(`/Admin/UsersManagement/${encodeEmail}`);
  };

  const handleUserDelete = (email) => {
    deleteUser(email);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="container_title">Users Management System</h2>
        <input
          onChange={(e) => setUserSearch(e.target.value)}
          value={userSearch}
          id="filterInput"
          placeholder="Filter users..."
          type="text"
          className="input_search"
        />
        <div className="users_container-grid">
          <span>Name</span>
          <span>Email</span>
          <span>Telephone</span>
          <span>Created at</span>
          <span>Address</span>
          <span>View Profile</span>
          <span>Delete</span>
          {filteredUsers.map((user, index) => (
            <React.Fragment key={index}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.telephone ? user.telephone : "N/A"}</span>
              <span>
                {user.createdAt
                  ? user.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </span>
              <span>
                {user.addresses.length > 0
                  ? user.addresses.map(
                      (
                        {
                          addressline1,
                          addressline2,
                          city,
                          county,
                          postalcode,
                        },
                        index
                      ) => (
                        <React.Fragment key={index}>
                          <span className="addressess">
                            Addressline1: {addressline1}
                          </span>
                          <span className="addressess">
                            Addressline2: {addressline2}
                          </span>
                          <span className="addressess">City: {city}</span>
                          <span className="addressess">County: {county}</span>
                          <span className="addressess">
                            Postcode: {postalcode}
                          </span>
                        </React.Fragment>
                      )
                    )
                  : "N/A"}
              </span>
              <span>
                {" "}
                <FontAwesomeIcon
                  onClick={() => handleUserClick(user.email)}
                  icon={faUser}
                />
              </span>
              <span>
                <FontAwesomeIcon
                  onClick={() => handleUserDelete(user.email)}
                  icon={faRemove}
                />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
