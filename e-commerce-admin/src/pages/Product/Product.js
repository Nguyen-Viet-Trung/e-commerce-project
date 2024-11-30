import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../../component/Table";
import { ProductTitle } from "../../util/constants";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import useSidebarContext from "../../context/SidebarContext";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import useProductsContext from "../../context/ProductContext";
export default function Products() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [products, setProducts] = useState([]);
  const { deleteProducts } = useProductsContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchProducts = async (page = 0) => {
    const response = await fetch(
      `http://localhost:8080/products/pagination?page=${page}&size=5`
    );
    const data = await response.json();
    setProducts(data.content);
    setTotalPages(data.totalPages);
  };
  const fetchProductName = async (page = 0) => {
    const search = query.toLowerCase();
    const response = await fetch(
      `http://localhost:8080/products/pagination/productName/${search}?page=${page}&size=5`
    );
    if (response.ok) {
      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } else {
      console.error("Failed to fetch products");
    }
  };
  const fetchProductID = async (page = 0) => {
    const search = query.toLowerCase();
    const response = await fetch(
      `http://localhost:8080/products/pagination/productID/${search}?page=${page}&size=5`
    );
    if (response.ok) {
      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } else {
      console.error("Failed to fetch products");
    }
  };
  const fetchProductType = async (page = 0) => {
    const search = query.toLowerCase();
    const response = await fetch(
      `http://localhost:8080/products/pagination/productType/${search}?page=${page}&size=5`
    );
    if (response.ok) {
      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } else {
      console.error("Failed to fetch products");
    }
  };
  const fetchProductPrice = async (page = 0) => {
    const search = Number(query);
    const response = await fetch(
      `http://localhost:8080/products/pagination/price/${search}?page=${page}&size=5`
    );
    if (response.ok) {
      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } else {
      console.error("Failed to fetch products");
    }
  };
  useEffect(() => {
    if (query === "") {
      fetchProducts(currentPage);
    } else {
      if (titleRef.current?.value === "name") {
        fetchProductName(currentPage);
      } else if (titleRef.current?.value === "price") {
        fetchProductPrice(currentPage);
      } else if (titleRef.current?.value === "category") {
        fetchProductType(currentPage);
      } else if (titleRef.current?.value === "productId") {
        fetchProductID(currentPage);
      } else {
        fetchProducts(currentPage);
      }
    }
  }, [query, currentPage]);

  const rowsDisplay = useMemo(() => {
    return products.map((item) => {
      return (
        <tr key={item.id} className={`font-semibold`}>
          <td>{item.id}</td>
          <td>
            <img className="w-16" src={item.image} alt="" />
          </td>
          <td>{item.name}</td>
          <td>$ {item.sellingPrice}</td>
          <td>{item.productType}</td>
          <td>{item.brand}</td>
          <td>
            <div className="cursor-pointer text-xl flex gap-2 items-center ">
              <Link to={`/product/${item.id}`}>
                <FaRegEdit className="text-green-500 hover:text-green-700" />
              </Link>
              <FaRegTrashCan
                onClick={() => deleteProducts(item.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [products]);

  return (
    <div className="overflow-auto custom-scroll-container bg-white sm:m-6">
      <TopSection
        query={query}
        setQuery={setQuery}
        titleRef={titleRef}
        setCurrentPage={setCurrentPage}
      />
      <Table title={ProductTitle} RowsDisplay={rowsDisplay} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
function TopSection(props) {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2  flex-wrap">
        <div className="flex items-center gap-2 border-b-2">
          <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
          <input
            onChange={(e) => {
              props.setQuery(e.target.value);
              props.setCurrentPage(0);
            }}
            type="search"
            className="h-8 focus:outline-none "
            placeholder={`Search ...`}
          />
        </div>
        <select ref={props.titleRef}>
          <option value="name">Name</option>
          <option value="productId">Product ID</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        <Link
          to="/product/add-product"
          onClick={() => setSelectedPageURL("/product/add-product")}
          className="btn btn-sm"
        >
          Add Product +
        </Link>
        <Link
          to="/product/available"
          onClick={() => setSelectedPageURL("/product/available")}
          className="btn btn-sm"
        >
          Product Available +
        </Link>
        <Link
          to="/product/product-info"
          onClick={() => setSelectedPageURL("/product/product-info")}
          className="btn btn-sm"
        >
          Product Info+
        </Link>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
}
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = 1; // Số lượng nút hiển thị xung quanh trang hiện tại

  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];

    // Hiển thị trang đầu tiên
    if (currentPage > range) {
      pages.push(0);
      if (currentPage > range + 1) pages.push("...");
    }

    // Hiển thị các trang xung quanh trang hiện tại
    for (
      let i = Math.max(0, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Hiển thị trang cuối cùng
    if (currentPage < totalPages - range - 1) {
      if (currentPage < totalPages - range - 2) pages.push("...");
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 pb-4 space-x-2">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : page === "..."
              ? "cursor-default text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={page === "..."}
        >
          {page === "..." ? "..." : page + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages - 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};
