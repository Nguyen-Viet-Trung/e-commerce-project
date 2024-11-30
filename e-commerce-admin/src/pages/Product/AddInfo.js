import { useState } from "react";
import useSidebarContext from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export default function AddInfo() {
  const { setSelectedPageURL } = useSidebarContext();
  const [formData, setFormData] = useState({
    productID: "",
    info1: "",
    info2: "",
    info3: "",
    info4: "",
    info5: "",
    info6: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    test();
  };
  const test = async () =>{
    const response = await axios.get("http://localhost:8080/view/productID/ASUS3");
    console.log(response);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8080/view/productID/" + formData.productID);
    if(response.data.productType === "headphone"){
        try{
        const res = await axios.post("http://localhost:8080/headphoneInfo/save", {
            productID: formData.productID,
            headphone_type: formData.info1,
            speaker_size:formData.info2,
            speaker_sensitivity:formData.info3,
            speaker_impedance: formData.info4,
            microphone_sensitivity: formData.info5,
            microphone_frequency_range: formData.info6
        });
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
    }
    else{
        try{
            const res = await axios.post("http://localhost:8080/productInfo/save", {
                productID: formData.productID,
                cpu: formData.info1,
                ram: formData.info2,
                hardDrive: formData.info3,
                gpu: formData.info4,
                display: formData.info5,
                battery: formData.info6
            })
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
        }
        catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          }
    }
  };
  return (
    <section className="overflow-auto bg-white md:m-6 rounded-md">
      <h1 className="text-2xl p-6 font-semibold">Add New Products</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Product ID: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product ID"
            name="productID"
            value={formData.productID}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Information 1: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Information 1"
            onChange={handleChange}
            name="info1"
            value={formData.info1}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Information 2: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Information 2"
            className="input input-bordered"
            name="info2"
            value={formData.info2}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">Information 3: </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Information 3"
            name="info3"
            value={formData.info3}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">Information 4: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="info4"
            value={formData.info4}
            placeholder="Information 4"
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">Information 5: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            name="info5"
            value={formData.info5}
            placeholder="Information 5"
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">Information 6: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            onChange={handleChange}
            placeholder="Information 6"
            name="info6"
            value={formData.info6}
          />
        </div>

        <div className="flex items-center justify-end col-span-full gap-4 mt-4">
          <button className="btn btn-primary text-white" type="submit">
            Add Product Information
          </button>
          <Link
            to="/product"
            onClick={() => setSelectedPageURL("/product")}
            className="btn btn-outline"
          >
            Cancel
          </Link>
        </div>
      </form>

    </section>
    
  );
}
