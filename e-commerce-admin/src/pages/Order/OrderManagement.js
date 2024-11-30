import { FaEye } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrderTitle } from "../../util/constants";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import Swal from "sweetalert2";
export default function OrderManagement() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const titleRef = useRef(null);
  const [OrderData, setOrderData] = useState([]);
  const fetchOrders = async (page = 0) => {
    const res = await fetch(
      `http://localhost:8080/orders/pagination?page=${page}&size=5`
    );
    if (res.status === 200) {
      const data = await res.json();
      setOrderData(data.content);
      setTotalPages(data.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  const fetchOrderCustomer = async (page = 0) => {
    const res = await fetch(
      `http://localhost:8080/orders/pagination/username/${query}?page=${page}&size=5`
    );
    if (res.status === 200) {
      const data = await res.json();
      setOrderData(data.content);
      setTotalPages(data.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  const fetchOrderByID = async (page = 0) => {
    const res = await fetch(
      `http://localhost:8080/orders/pagination/orderID/${query}?page=${page}&size=5`
    );
    if (res.status === 200) {
      const data = await res.json();
      setOrderData(data.content);
      setTotalPages(data.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  const fetchOrderByStatus = async (page = 0) => {
    const res = await fetch(
      `http://localhost:8080/orders/pagination/status/${query}?page=${page}&size=5`
    );
    if (res.status === 200) {
      const data = await res.json();
      setOrderData(data.content);
      setTotalPages(data.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  const fetchOrderByTotal = async (page = 0) => {
    const search = Number(query);
    const res = await fetch(
      `http://localhost:8080/orders/pagination/totalPrice/${search}?page=${page}&size=5`
    );
    if (res.status === 200) {
      const data = await res.json();
      setOrderData(data.content);
      setTotalPages(data.totalPages);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (query === "") {
      fetchOrders(currentPage);
    } else {
      if (titleRef.current?.value === "customer") {
        fetchOrderCustomer(currentPage);
      } else if (titleRef.current?.value === "orderId") {
        fetchOrderByID(currentPage);
      } else if (titleRef.current?.value === "total") {
        fetchOrderByTotal(currentPage);
      } else if (titleRef.current?.value === "status") {
        fetchOrderByStatus(currentPage);
      } else {
        fetchOrders(currentPage);
      }
    }
  }, [query, currentPage]);
  const rowsDisplay = useMemo(() => {
    return OrderData.map((item) => {
      const day = new Date(Date.parse(item.order_date));
      const formattedDate = day.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <tr key={item.orderID}>
          <td>{item.orderID}</td>
          <td>{item.username}</td>
          <td>{formattedDate}</td>
          <td>$ {item.totalPrice}</td>
          <td>{item.status}</td>
          <td className="cursor-pointer text-2xl text-blue-500 hover:text-blue-800">
            <Link to={`${item.orderID}`}>
              <FaEye />
            </Link>
          </td>
        </tr>
      );
    });
  }, [OrderData]);
  return (
    <div className="overflow-auto bg-white sm:m-6">
      <TopSection
        query={query}
        setQuery={setQuery}
        titleRef={titleRef}
        setCurrentPage={setCurrentPage}
      />
      <Table title={OrderTitle} RowsDisplay={rowsDisplay} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
const TopSection = (props) => {
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2 border-b-2 flex-wrap">
        <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
        <input
          type="text"
          className="h-8 focus:outline-none "
          placeholder={`Search ...`}
          onChange={(e) => {
            props.setQuery(e.target.value);
            props.setCurrentPage(0);
          }}
        />
        <select ref={props.titleRef}>
          <option value="customer">Customer</option>
          <option value="orderId">Order ID</option>
          <option value="total">Total</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
};
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
