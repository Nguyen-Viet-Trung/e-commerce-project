import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInContext from "../context/LogInContext";
import CartContext from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";
import Login from "../pages/Login";

function Navbar() {
  const { LoginData } = useContext(LogInContext);
  const { numberOfProduct } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const { numberOfItem } = useContext(WishlistContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleLogOut = () => {
    LoginData.logout();
    navigate("/"); //liệt
  };
  const username = LoginData?.username || "Username";
  const loginState = LoginData?.loginState || false; // Giá trị mặc định là false
  const handleSearch = (event) => {
    event.preventDefault();
    let searchResult = products.filter(
      (products) =>
        products.name.toLowerCase().includes(searchText.toLowerCase()) ||
        products.brand.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchText("");
    if (searchResult.length === 0) {
      alert("No result found, back to Home page. Try searching again!");
      navigate("/");
    } else {
      navigate(`/search/${searchText}`, { state: { searchResult } });
    }
  };
  return (
    <div className="main-navbar shadow-sm sticky-top">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 my-auto d-none d-sm-none d-md-block d-lg-block">
              <Link to={"/"} className="brand-name">Trung Tech</Link>
            </div>
            <div className="col-md-5 my-auto" onSubmit={handleSearch}>
              <form role="search">
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Search your product"
                    className="form-control"
                    name="keyword"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="btn bg-white" type="submit">
                    <i className="fa fa-search" onClick={handleSearch} />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 my-auto">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    <i className="fa fa-shopping-cart" /> Cart (
                    {numberOfProduct})
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user" /> {username}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={
                          username === "Username"
                            ? "/login"
                            : "/profile"
                        }
                      >
                        <i className="fa fa-user" /> {loginState ===
                        true ? "Profile" : "Login"}
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to={"/wishlist"}>
                        <i class="fa fa-heart"></i> Wishlist ({numberOfItem})
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"/order"}>
                        <i className="fa fa-list" /> Order History
                      </Link>
                    </li>
                    {LoginData.loginState && (
                      <li>
                        <Link className="dropdown-item" onClick={handleLogOut}>
                          <i className="fas fa-sign-out-alt" /> Logout
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link
            className="navbar-brand d-block d-sm-block d-md-none d-lg-none"
            style={{ color: "#2874f0" }}
            to={"/"}
          >
            Trung Tech
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 d-flex justify-content-between">
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to={"/"}>
                  <i
                    className="fa fa-home"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Home
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/phone">
                  <i
                    className="fa fa-mobile"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Phone
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/tablet">
                  <i
                    className="fa fa-tablet"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Tablet
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/laptop">
                  <i
                    className="fa fa-laptop"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Laptop
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/headphone">
                  <i
                    className="fa fa-headphones"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Headphones
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <a
                  className="nav-link"
                  href="https://www.facebook.com/DienDanFMVN/"
                >
                  <i
                    className="fa fa-phone"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Contact
                </a>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to={"/aboutUs"}>
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  About
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to={"/chatbot"}>
                  <i
                    className="fa fa-robot"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Chatbot
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
