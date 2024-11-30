import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams(); // Destructure `id` directly
  const [details, setDetails] = useState([]);
  const [overview, setOverview] = useState(null); // Initialize as `null` for conditional rendering

  const calculateTotal = () => {
    return details.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orderdetails/${id}`);
        const data = await response.json();
        setDetails(data);

        const response1 = await fetch(`http://localhost:8080/orders/byid/${id}`);
        const data1 = await response1.json();
        setOverview(data1);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <section className="overflow-x-auto bg-white md:m-6 overflow-auto rounded-md">
      <div className="flex flex-col items-stretch xl:flex-row divide-y-2 xl:divide-y-0 xl:items-center xl:justify-evenly space-x-4 xl:divide-x-2 mx-4">
        <div className="grid grid-cols-2 gap-4 m-4 p-4">
          <h2 className="text-lg font-semibold">Order ID</h2>
          <h2 className="text-lg font-semibold">Customer Name</h2>
          <div className="bg-red-600 size-16 flex items-center justify-center rounded-full">
            <div className="bg-red-400 size-12 flex items-center justify-center rounded-full">
              <h3 className="text-white text-lg">{overview?.orderID || "N/A"}</h3>
            </div>
          </div>
          <h1 className="text-xl place-self-center">{overview?.username || "N/A"}</h1>
        </div>
        <div className="flex flex-col my-6 gap-4 p-4 ">
          <h1 className="text-lg font-semibold text-[#8B909A]">Personal Information</h1>
          <div className="columns-2">
            <h2>Address</h2> <h2>Phone</h2> <h2>Email</h2>
            <h2 className="font-bold">{overview?.address || "N/A"}</h2>
            <h2 className="font-bold">{overview?.phonenumber || "N/A"}</h2>
            <h2 className="font-bold">{overview?.email || "N/A"}</h2>
          </div>
        </div>
        <div className="flex flex-col my-6 gap-4 p-4 ">
          <h1 className="text-lg font-semibold text-[#8B909A]">Order Details</h1>
          <div className="columns-2">
            <h2>Status</h2> <h2>Create At</h2> <h2>Total Price</h2>
            <h2 className="font-bold">{overview?.status || "N/A"}</h2>
            <h2 className="font-bold">
              {overview?.create_at
                ? new Date(overview.create_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </h2>
            <h2 className="font-bold">${calculateTotal()}</h2>
          </div>
        </div>
      </div>
      <hr />
      <table className="table table-lg table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Color</td>
            <td>Total Price</td>
          </tr>
        </thead>
        <tbody>
          {details.length > 0 ? (
            details.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.productName}</td>
                <td>${(item.price / item.quantity).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{item.color}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No order items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

