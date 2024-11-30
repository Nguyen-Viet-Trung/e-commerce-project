import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import CartContext from "../context/CartContext";
import axios from "axios";

export const CancelPayment = () => {
  const location = useLocation();
  const { cartItem, setNumberOfProduct, cartKey, setCartItem } = useContext(CartContext);
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get("paymentStatus");
  const checkoutDetails = JSON.parse(localStorage.getItem("checkoutData"));
  console.log(cartItem);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    // Thiết lập orderID nếu có checkoutDetails và chưa có orderID
    if (checkoutDetails && !orderID) {
      setOrderID(checkoutDetails.username + Date.now().toString());
    }
  }, [checkoutDetails, orderID]);

  const postOrderDataOnce = async () => {
    if (!orderID || !checkoutDetails) return;

    // Tạo dữ liệu cho đơn hàng chính
    const mainOrderData = {
      ...checkoutDetails,
      status: "cancel",
      orderID: orderID,
    };

    // Tạo dữ liệu cho các sản phẩm trong orderDetails
    const updatedCartItems = cartItem.map((item) => ({
      price: item.sellingPrice * item.quantity,
      productName: item.name,
      quantity: item.quantity,
      color: item.color,
      productID: item.productID,
      orderID: orderID,
    }));

    try {
      await axios.post("http://localhost:8080/orders/save", mainOrderData);
      console.log("Main order saved successfully");

      const orderPromises = updatedCartItems.map((item) =>
        axios.post("http://localhost:8080/orderdetails", item)
      );

      await Promise.all(orderPromises);
      console.log("All order items saved successfully");


    } catch (error) {
      console.error("Error saving order data:", error);
    }
      localStorage.removeItem(cartKey);
      localStorage.removeItem("checkoutData");
      setNumberOfProduct(0);
      setCartItem([]);
  };

  useEffect(() => {
    // Gọi hàm postOrderDataOnce một lần duy nhất
    postOrderDataOnce();
  }, [orderID,cartItem]); 

  if (paymentStatus !== "cancel") {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 text-center">
        <div
          className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto"
          style={{
            height: "200px",
            width: "200px",
            cursor: "pointer",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <i className="fas fa-times" style={{ fontSize: "100px" }}></i>
        </div>

        <h1 className="text-danger mt-3">Payment Cancelled</h1>
        <p>
          Your payment request was cancelled.
          <br /> Please try again or contact support.
        </p>
        <p className="mt-4">
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};





