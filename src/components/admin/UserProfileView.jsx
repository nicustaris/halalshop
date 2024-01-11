import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useUsersContext } from "../../context/UsersContext";

import "./UserProfileView.css";

const UserProfileView = () => {
  const { userEmail } = useParams();
  const decodedEmail = atob(userEmail);

  const { getUserByEmail, getOrdersByEmail } = useUsersContext();
  const user = getUserByEmail(decodedEmail);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const ordersData = await getOrdersByEmail(user.email);
        setOrders(ordersData);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 style={{ marginBottom: "15px" }}>User Profile</h2>
        {user && (
          <div className="user-profile">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Telephone: {user.telephone || "N/A"}</p>
              <p>
                Joined on:{" "}
                {user.createdAt
                  ? user.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div className="user-addresses">
              <h3 style={{ marginBottom: "10px" }}>Addresses</h3>
              {user.addresses.length > 0 ? (
                user.addresses.map((address, index) => (
                  <div key={index} className="address">
                    <p>{address.addressline1}</p>
                    <p>{address.addressline2}</p>
                    <p>
                      {address.city}, {address.county}, {address.postalcode}
                    </p>
                  </div>
                ))
              ) : (
                <p>No addresses available</p>
              )}
            </div>
            {orders.length > 0 ? (
              <div className="orders-history">
                <h3 style={{ marginBottom: "10px" }}>Orders History</h3>
                {orders.map(({ order }, index) => (
                  <div key={index} className="order">
                    <p>Date: {order.paymentTime.toDate().toLocaleString()}</p>
                    <div>
                      <strong>Items:</strong>
                      {Object.values(order.products).map((product, index) => (
                        <p key={index}>
                          {product.productName} - {product.quantity} items
                        </p>
                      ))}
                    </div>
                    <strong>Total Paid: £{order.total}</strong>

                    <p>Payment Method: {order.paymentMethod}</p>
                  </div>
                ))}
              </div>
            ) : (
              <strong>
                No orders are currently associated with this user.
              </strong>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileView;
