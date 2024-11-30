import React, { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import LogInContext from "../context/LogInContext";
import axios from "axios";

const ProductReview = ({ productID }) => {
  const { LoginData } = useContext(LogInContext);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [productID]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/comments");
      const reviews1 = await response.data
      setReviews(reviews1.filter(review => review.productId === Number(productID)));
      console.log(reviews1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (comment.trim() && rating) {
      const newReview = {
        id: Date.now().toString() +LoginData.username,
        productId: productID,
        username: LoginData.username === "Username" ? "Guest" : LoginData.username,
        rating,
        comment,
        date: new Date().toLocaleDateString(),
      };

      try {
        await axios.post("http://localhost:8080/comments/save", newReview);
        setReviews([newReview, ...reviews]);
        setComment("");
        setRating(null);
      } catch (error) {
        console.error("Error saving comment:", error);
        alert("There was an error saving your comment. Please try again.");
      }
    } else {
      alert("Please provide a rating and a comment!");
    }
  };

  return (
    <div className="product-review container mt-3 p-4 shadow-lg rounded bg-white">
      <h3 className="text-center">Customer Reviews</h3>
      <form onSubmit={handleSubmitReview} className="review-form">
        <div className="rating-section mb-4">
          <label className="fw-bold">Rate this product:</label>
          <div className="stars d-flex justify-content-center mt-2">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <FaStar
                  key={index}
                  className="star"
                  size={30}
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleRatingClick(currentRating)}
                />
              );
            })}
          </div>
        </div>

        <div className="comment-section mb-4">
          <label className="fw-bold">Write a comment:</label>
          <textarea
            className="form-control mt-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Share your thoughts about the product"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Review
        </button>
      </form>

      <div className="reviews-section mt-5">
        <h4 className="fw-bold mb-4">Previous Reviews</h4>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-item p-3 mb-3 bg-light rounded shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="review-author">
                  <strong>
                    {review.username}
                  </strong>
                  <small className="text-muted d-block">
                    Posted on: {review.date}
                  </small>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((star, index) => (
                    <FaStar
                      key={index}
                      size={20}
                      color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
              </div>
              <p className="review-comment fst-italic">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReview;
