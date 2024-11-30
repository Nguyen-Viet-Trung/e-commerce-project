import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import Product from "./Product";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const WishlistProduct = () => {
  const { wishlist } = useContext(WishlistContext);

  // Check if the wishlist is null or empty
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="py-3 py-md-5 bg-light">
        <div className="container">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="btn btn-primary">
            Back to Main Page
          </Link>
        </div>
      </div>
    );
  }

  // If wishlist exists and has items, render the products
  const renderResult = wishlist.map((product, index) => (
    <Product key={index} product={product}></Product>
  ));

  return (
    <div className="py-3 py-md-5 bg-light" id="trending">
      <div className="container">
        <h4 className="mb-0">Your Wishlist</h4>

        <div className="d-flex justify-content-between align-items-center mb-4"></div>

        <div className="row g-3">{renderResult}</div>
      </div>
    </div>
  );
};

export default WishlistProduct;

