import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviews";
import "./styles/Reviews.css";

const Reviews = () => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const reviews = useSelector((state) => state.reviews);

  // console.log('reviews', reviews)

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  let listOfReviews;

  if (reviews !== undefined) {
    listOfReviews = reviews.map((review) => {
      return (
        <div key={review.id}>
          <h3>{review.name}</h3>
          <h4>{review.description}</h4>
        </div>
      );
    });
  } else {
    listOfReviews = (
      <div>
        <h3 className="reviews-title">No reviews at this time.</h3>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">
        Leave a review to tell us what you think!
      </h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <label htmlFor="name"> User Name:</label>
        <input
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="review">Leave your review:</label>
        <input
          value={review}
          type="text"
          required
          onChange={(e) => setReview(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{listOfReviews}</div>
    </div>
  );
};

export default Reviews;
