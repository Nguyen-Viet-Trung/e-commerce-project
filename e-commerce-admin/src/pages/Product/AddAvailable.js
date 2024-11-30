import axios from "axios";
import { useState } from "react";
import useSidebarContext from "../../context/SidebarContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function AddAvailable() {
  const setSelectedPageURL = useSidebarContext();
  const [formData, setFormData] = useState({
    product_id: "",
    available: 0,
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/productAvailable/save",
        {
          productID: formData.product_id,
          available: formData.available,
          color: formData.color,
        }
      );
      const data = await res.data;
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: data.message || "Product added successfully!",
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <section className="overflow-auto bg-gray-50 py-8 md:py-12 px-4 md:px-6 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Product Availability
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product ID */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product ID
            </label>
            <input
              required
              type="text"
              placeholder="Enter Product ID"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Available Number */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Available Number
            </label>
            <input
              required
              type="number"
              placeholder="Enter Available Quantity"
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Color */}
        <div className="form-control mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Color
          </label>
          <input
            required
            type="text"
            placeholder="Enter Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold shadow-md"
            type="submit"
          >
            Add Product Available
          </button>
          <Link
            to="/product"
            onClick={() => setSelectedPageURL("/product")}
            className="text-blue-500 hover:underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

