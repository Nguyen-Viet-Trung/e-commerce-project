import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useSidebarContext from "../../context/SidebarContext"
import useProductsContext from "../../context/ProductContext"
import { useForm } from "react-hook-form"
export default function AddProducts() {
  const { setSelectedPageURL } = useSidebarContext()
  const { addProducts } = useProductsContext()
  const [category, setCategory] = useState([])
  useEffect(() => {
    setCategory([
      "phone",
      "laptop",
      "headphone",
      "tablet",
    ])
  }, [])
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    addProducts(data)
  }
  return (
    <section className="overflow-auto bg-white md:m-6 rounded-md custom-scroll-container">
      <h1 className="text-2xl p-6 font-semibold">Add New Products</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Product Name: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Product Name"
            {...register("name")}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Selling Price: </span>
          </label>
          <input
            required
            type="number"
            placeholder="Product Price"
            {...register("sellingPrice")}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sold: </span>
          </label>
          <input
            required
            type="text"
            placeholder="Sold"
            className="input input-bordered"
            {...register("sold")}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="form-control grow">
            <label className="label">
              <span className="label-text">Category: </span>
            </label>
            <select
              {...register("productType")}
              className="select select-bordered w-full max-w-xs min-w-10"
            >
              {category.map(item => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="form-control min-w-10">
            <label className="label">Original Price: </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="Original Price"
              {...register("originalPrice")}
             
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">Image: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("image")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Image 1: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("image1")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Image 2: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("image2")}
            placeholder="Insert Image URL"
          />
        </div>
        <div className="form-control">
          <label className="label">Brand: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("brand")}
            placeholder="Insert brand"
          />
        </div>
        <div className="form-control">
          <label className="label">Product ID: </label>
          <input
            required
            type="text"
            className="input input-bordered"
            {...register("productID")}
            placeholder="Insert Product ID"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Description: </label>
          <textarea
            required
            className="textarea textarea-bordered"
            {...register("description")}
            placeholder="Insert description for the product"
            rows={5}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-primary text-white" type="submit">
            Add Product
          </button>
          <Link
            to="/product"
            onClick={() => setSelectedPageURL("/product")}
            className="link "
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  )
}
