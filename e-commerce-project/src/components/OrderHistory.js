import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LogInContext from "../context/LogInContext";


export default function OrderHistory() {
  const [order, setOrder] = useState([]);
  const { LoginData } = useContext(LogInContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders/${LoginData.username}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchOrder();
  }, [LoginData.username]);

  if (order.length === 0) {
    return (
      <div className="order-history-empty py-5 text-center bg-light">
        <div className="container">
          <h5 className="mb-3">Your order history is empty.</h5>
          <Link to="/" className="btn btn-primary">
            Back to Main Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order History</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.orderID}</td>
                <td className={`font-weight-bold ${item.status === "success" ? "text-success" : "text-danger"}`}>
                  {item.status}
                </td>
                <td>{item.order_date}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
                <td>
                  <Link to={`/order-details/${item.orderID}`} className="btn btn-info btn-sm">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

