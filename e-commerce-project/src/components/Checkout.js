import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogInContext from "../context/LogInContext";

const Checkout = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const { LoginData } = useContext(LogInContext);

  const location = useLocation();
  let subTotal = location.state?.subtotal;

  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    address: "",
    totalPrice: subTotal,
    order_date: new Date().toLocaleDateString(),
    username : LoginData?.loginState ? LoginData?.username : "Guest",
    payment_method: "",
    paid: 0,
    delivery_state:"" //Ongoing or Done
  });

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnlinePayment = async () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payment_method: "Online Payment",
      paid: subTotal,
      delivery_state:"Ongoing"
  }));
    const { fullname, phonenumber, email, address } = formData;
    if (!fullname || !phonenumber || !email || !address) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/create-payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ price: subTotal }),
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  const handleOnDeliveryPayment = async () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payment_method: "On Delivery",
      paid: parseInt(subTotal*10/100),
      delivery_state: "Ongoing"
  }));
    const { fullname, phonenumber, email, address } = formData;
    if (!fullname || !phonenumber || !email || !address) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }
  

    try {
      const response = await fetch(
        "http://localhost:8080/create-payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ price: parseInt(subTotal*10/100) }),
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  return (
    <div className="py-3 py-md-4 checkout">
      <div className="container">
        <h4>Checkout</h4>
        <hr />

        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="shadow bg-white p-3">
              <h4 className="text-primary">
                Item Total Amount:{" "}
                <span className="float-end">${subTotal}</span>
              </h4>
              <hr />
              <small>* Items will be delivered in 3 - 5 days.</small>
              <br />
              <small>* Tax and other charges are included?</small>
              <br />
              <small>* If you choose Cash on Delivery, you will still need to pay 10% of the total bill as a deposit upfront.</small>
            </div>
          </div>

          <div className="col-md-12">
            <div className="shadow bg-white p-3">
              <h4 className="text-primary">Basic Information</h4>
              <hr />
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullname"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input
                    required
                    type="number"
                    name="phonenumber"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={formData.phonenumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Full Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label>Description</label>
                  <textarea
                    required
                    name="description"
                    className="form-control"
                    rows="2"
                    // Description input does not change the state
                  ></textarea>
                </div>

                <div className="col-md-12 mb-3">
                  <label>Select Payment Mode:</label>
                  <div className="d-md-flex align-items-start">
                    <div
                      className="nav col-md-3 flex-column nav-pills me-3"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        className="fw-bold btn btn-outline-primary"
                        id="cashOnDeliveryTab-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#cashOnDeliveryTab"
                        type="button"
                        onClick={() => setPaymentMode("cash")}
                        style={{
                          border: "1px solid",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        style={{
                          border: "1px solid",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                        className="btn btn-outline-warning fw-bold"
                        id="onlinePayment-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#onlinePayment"
                        type="button"
                        onClick={() => setPaymentMode("online")}
                      >
                        Online Payment
                      </button>
                    </div>
                    <div
                      className="tab-content col-md-9"
                      id="v-pills-tabContent"
                    >
                      <div
                        className={`tab-pane fade ${
                          paymentMode === "cash" ? "show active" : ""
                        }`}
                        id="cashOnDeliveryTab"
                      >
                        <h6>Cash on Delivery Mode</h6>
                        <hr />
                        <button type="button" className="btn btn-primary" onClick={handleOnDeliveryPayment}>
                          Place Order (Cash on Delivery)
                        </button>
                      </div>
                      <div
                        className={`tab-pane fade ${
                          paymentMode === "online" ? "show active" : ""
                        }`}
                        id="onlinePayment"
                      >
                        <h6>Online Payment Mode</h6>
                        <hr />
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={handleOnlinePayment}
                        >
                          Pay Now (Online Payment)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
