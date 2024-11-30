import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import useProductsContext from "../../context/ProductContext";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const { setSelectedPageURL } = useSidebarContext();
  const [productData, setProductData] = useState({});
  const { editProducts } = useProductsContext();
  const nameRef = useRef(null);
  const priceSRef = useRef(null);
  const categoryRef = useRef(null);
  const stockRef = useRef(null);
  const descriptionRef = useRef(null);
  const originalPriceRef = useRef(null);
  const imageRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const BrandRef = useRef(null);
  const ProductIDRef = useRef(null);
  const [availableColor, setAvailableColor] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const category = ["phone", "laptop", "headphone", "tablet"];
  useEffect(() => {
    const fetchProductAndAvailable = async () => {
      const res = await fetch(`http://localhost:8080/view/product/${id}`);
      const data = await res.json();
      setProductData(data);

      if (categoryRef.current) {
        categoryRef.current.value = data.productType;
      }

      if (data.productID) {
        try {
          const res1 = await axios.get(
            `http://localhost:8080/productAvailable/${data.productID}`
          );
          setAvailableColor(res1.data);
        } catch (error) {
          console.error("Error fetching available colors:", error);
          setAvailableColor(null); // Đặt giá trị là null nếu lỗi xảy ra
        }

        try {
          let res2;
          if (data.productType === "headphone") {
            res2 = await axios.get(
              `http://localhost:8080/headphoneInfo/${data.productID}`
            );
          } else {
            res2 = await axios.get(
              `http://localhost:8080/productInfo/${data.productID}`
            );
          }
          setProductInfo(res2.data);
        } catch (error) {
          console.error("Error fetching product info:", error);
          setProductInfo(null); // Đặt giá trị là null nếu lỗi xảy ra
        }
      }
    };
    fetchProductAndAvailable();
  }, [id]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const sellingPrice = Number(priceSRef.current?.value);
    const productType = String(categoryRef.current?.value);
    const sold = Number(stockRef.current?.value);
    const description = descriptionRef.current?.value;
    const originalPrice = Number(originalPriceRef.current?.value);
    const image = imageRef.current?.value;
    const image1 = image1Ref.current?.value;
    const image2 = image2Ref.current?.value;
    const brand = BrandRef.current?.value;
    const ProductID = ProductIDRef.current?.value;

    editProducts({
      id: Number(id),
      nameProduct: name,
      sellingPrice: sellingPrice,
      productType: productType,
      sold: sold,
      description,
      originalPrice: originalPrice,
      image: image,
      image1: image1,
      image2: image2,
      brand: brand,
      productID: ProductID,
    });
    if (productInfo !== null) {
      if (productType === "headphone") {
        await axios.put(
          `http://localhost:8080/headphoneInfo/${ProductID}`,
          productInfo
        );
      } else {
        await axios.put(
          `http://localhost:8080/productInfo/${ProductID}`,
          productInfo
        );
      }
    } else {
      return true;
    }
    const updateAvailableColors = async () => {
      try {
        const updateRequests = availableColor.map((color) =>
          axios.put(
            `http://localhost:8080/productAvailable/${ProductID}`,
            color
          )
        );

        await Promise.all(updateRequests);
      } catch (error) {
        console.error("Error updating available colors:", error);
      }
    };

    updateAvailableColors();
  };
  return (
    <form
      className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      onSubmit={onSubmit}
    >
      <div className="form-control col-span-1">
        <label className="label">
          <span className="label-text">Product Name: </span>
        </label>
        <input
          ref={nameRef}
          required
          type="text"
          placeholder="Product Name"
          name="title"
          className="input input-bordered"
          defaultValue={productData?.name}
          onChange={(e) => {
            if (nameRef.current) nameRef.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Selling Price: </span>
        </label>
        <input
          ref={priceSRef}
          required
          type="text"
          placeholder="Product Price"
          name="price"
          className="input input-bordered"
          defaultValue={productData?.sellingPrice}
          onChange={(e) => {
            if (priceSRef.current) priceSRef.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Sold: </span>
        </label>
        <input
          ref={stockRef}
          required
          type="text"
          placeholder="Product Stock"
          name="stock"
          className="input input-bordered"
          defaultValue={productData?.sold}
          onChange={(e) => {
            if (stockRef.current) stockRef.current.value = e.target.value;
          }}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="form-control grow">
          <label className="label">
            <span className="label-text">Category: </span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs min-w-10"
            defaultValue={productData?.productType || ""}
            ref={categoryRef}
            onChange={(e) => {
              if (categoryRef.current)
                categoryRef.current.value = e.target.value;
            }}
          >
            {category.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control min-w-10">
          <label className="label">Original Price: </label>
          <input
            ref={originalPriceRef}
            type="number"
            className="input input-bordered"
            placeholder="Discount"
            name="discount"
            defaultValue={productData?.originalPrice}
            onChange={(e) => {
              if (originalPriceRef.current)
                originalPriceRef.current.value = e.target.value;
            }}
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">Image: </label>
        <input
          required
          ref={imageRef}
          type="text"
          className="input input-bordered"
          name="thumbnail"
          placeholder="Insert Image URL"
          defaultValue={productData?.image}
          onChange={(e) => {
            if (imageRef.current) imageRef.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">Image 1: </label>
        <input
          required
          ref={image1Ref}
          type="text"
          className="input input-bordered"
          name="thumbnail"
          placeholder="Insert Image URL"
          defaultValue={productData?.image1}
          onChange={(e) => {
            if (image1Ref.current) image1Ref.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">Image 2: </label>
        <input
          required
          ref={image2Ref}
          type="text"
          className="input input-bordered"
          name="thumbnail"
          placeholder="Insert Image URL"
          defaultValue={productData?.image2}
          onChange={(e) => {
            if (image2Ref.current) image2Ref.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">Brand: </label>
        <input
          required
          ref={BrandRef}
          type="text"
          className="input input-bordered"
          name="thumbnail2"
          placeholder="Insert Image URL"
          defaultValue={productData?.brand}
          onChange={(e) => {
            if (BrandRef.current) BrandRef.current.value = e.target.value;
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">Product ID: </label>
        <input
          required
          ref={ProductIDRef}
          type="text"
          className="input input-bordered"
          name="thumbnail3"
          placeholder="Insert Image URL"
          defaultValue={productData?.productID}
          onChange={(e) => {
            if (ProductIDRef.current)
              ProductIDRef.current.value = e.target.value;
          }}
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label">Decription: </label>
        <textarea
          required
          ref={descriptionRef}
          className="textarea textarea-bordered"
          name="description"
          placeholder="Insert description for the product"
          rows={5}
          defaultValue={productData?.description}
          onChange={(e) => {
            if (descriptionRef.current)
              descriptionRef.current.value = e.target.value;
          }}
        />
      </div>
      {productInfo && Object.keys(productInfo).length > 0 && (
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Product Information:</h3>
          {Object.entries(productInfo)
            .filter(([key]) => key !== "id" && key !== "productID") // Loại bỏ id và productID. Chuyển đổi key, thay đổi toàn bộ _ thành " " trên global
            .map(([key, value], index) => (
              <div key={index} className="form-control mb-2">
                <label className="label">
                  <span className="label-text capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={value}
                  onChange={(e) => {
                    setProductInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }));
                  }}
                />
              </div>
            ))}
        </div>
      )}
      {availableColor && availableColor.length > 0 && (
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Available Colors:</h3>
          {availableColor.map((colorItem, index) => (
            <div key={colorItem.id} className="flex items-center gap-4 mb-2">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Color:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={colorItem.color}
                  onChange={(e) => {
                    const newColors = [...availableColor];
                    newColors[index].color = e.target.value;
                    setAvailableColor(newColors);
                  }}
                />
              </div>
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Available:</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={colorItem.available}
                  onChange={(e) => {
                    const newColors = [...availableColor];
                    newColors[index].available = Number(e.target.value);
                    setAvailableColor(newColors);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <button className="btn btn-primary text-white" type="submit">
          Update Product
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
  );
}
