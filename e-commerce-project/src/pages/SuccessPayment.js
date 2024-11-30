import { Link, Navigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";

export const SuccessPayment = () => {
  const location = useLocation();
  const { cartItem, setNumberOfProduct, cartKey, setCartItem } = useContext(CartContext);
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get("paymentStatus");
  const checkoutDetails = JSON.parse(localStorage.getItem("checkoutData"));
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
      status:"success",
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

      const orderPromises = updatedCartItems.map((item) => {
        return Promise.all([
          axios.post("http://localhost:8080/orderdetails", item),
          axios.put("http://localhost:8080/updateQuantity", {
            productID: item.productID,
            color: item.color,
            available: item.quantity
          }),
          axios.put("http://localhost:8080/updateSold", {
            productID: item.productID,
            name: item.name,
            sellingPrice: item.sellingPrice,
            originalPrice: item.originalPrice,
            image: item.image,
            description: item.description,
            sold: item.quantity,
            productType: item.productType,
            brand: item.brand,
            createdDate: item.createdDate,
          }),
          console.log(item.sold, " " , item.quantity)
        ]);
      });
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

  if (paymentStatus !== 'success') {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 text-center">
        <div
          className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto"
          style={{ height: "200px", width: "200px" }}
        >
          <i className="checkmark display-1">✓</i>
        </div>
        <h1 className="text-success mt-3">Success</h1>
        <p>We received your purchase request,<br /> we'll be in touch shortly!</p>
        <p className="mt-4">
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

