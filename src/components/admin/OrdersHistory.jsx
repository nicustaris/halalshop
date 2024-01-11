import React, { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useUsersContext } from "../../context/UsersContext";
import "./OrdersHistory.css";

const OrdersHistory = () => {
  const { fetchOrdersHistoryData } = useUsersContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersHistoryData()
      .then((ordersHistoryData) => setOrders(ordersHistoryData))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container orders-history">
        {orders.map((orderData, index) => {
          const order = orderData.order || orderData;
          console.log(orderData);
          return (
            <div className="order" key={index}>
              <h3>Order #{index + 1}</h3>
              <div className="order-details">
                <div className="order-info">
                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Payment Time:</strong>{" "}
                    {order.paymentTime?.toDate().toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address?.join(", ")}
                  </p>
                  <p>
                    <strong>Telephone:</strong> {order.telephone}
                  </p>
                </div>
                <div className="products-list">
                  <strong>Products:</strong>
                  <ul>
                    {order.products?.map((product, productIndex) => (
                      <li key={productIndex}>
                        {product.productName} - £{product.productPrice}{" "}
                        <small>Quantity: {product.quantity}</small>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-total">
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersHistory;
