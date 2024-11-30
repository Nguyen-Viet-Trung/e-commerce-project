import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const onTrendingScroll = () => {
    // Check if the current path is not "/"
    if (location.pathname !== "/") {
      navigate("/");
    }
    const productListSection = document.getElementById("trending");
    if (productListSection) {
      productListSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onLatestScroll = () => {
    // Check if the current path is not "/"
    if (location.pathname !== "/") {
      navigate("/");
    }
    const productListSection = document.getElementById("latest");
    if (productListSection) {
      productListSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h4 className="footer-heading">Trung Tech</h4>
              <div className="footer-underline" />
              <p>
                A newly launched e-commerce platform for online shopping,
                created by Nguyen Viet Trung from the National Economics
                University. We hope you enjoy using our service.
              </p>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading">Quick Links</h4>
              <div className="footer-underline" />
              <div className="mb-2">
                <Link className="text-white" to={"/"}>
                  Home
                </Link>
              </div>
              <div className="mb-2">
                <Link to={"/aboutUs"} className="text-white">
                  About Us
                </Link>
              </div>
              <div className="mb-2">
                <a
                  href="https://www.facebook.com/DienDanFMVN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Contact Us
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Blogs
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Sitemaps
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading">Shop Now</h4>
              <div className="footer-underline" />
              <div className="mb-2">
                <a href="" className="text-white">
                  Collections
                </a>
              </div>
              <div className="mb-2">
                <a onClick={onTrendingScroll} className="text-white" style={{cursor:"pointer"}}>
                  Trending Products
                </a>
              </div>
              <div className="mb-2">
                <a onClick={onLatestScroll} className="text-white" style={{cursor:"pointer"}}>
                  New Arrivals Products
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Featured Products
                </a>
              </div>
              <div className="mb-2">
                <Link to={"/cart"} className="text-white">
                  Cart
                </Link>
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading">Reach Us</h4>
              <div className="footer-underline" />
              <div className="mb-2">
                <p>
                  <i className="fa fa-map-marker" /> Chung Cư 4F: 102 Vũ Phạm
                  Hàm, Cầu Giấy, Hà Nội
                </p>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  <i className="fa fa-phone" /> +94 888-XXX-XXXX
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  <i className="fa fa-envelope" /> Viettrung0302@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p className="">
                {" "}
                © 2024 - TrungTech IT - Ecommerce. All rights reserved.
              </p>
            </div>
            <div className="col-md-4">
              <div className="social-media">
                Get Connected:
                <a
                  href="https://www.facebook.com/DienDanFMVN/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook" />
                </a>
                <a href="">
                  <i className="fa fa-twitter" />
                </a>
                <a href="">
                  <i className="fa fa-instagram" />
                </a>
                <a href="">
                  <i className="fa fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
