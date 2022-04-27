import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../store/reviews';

const Reviews = () => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const reviews = useSelector((state) => state.reviews);
  useEffect(() => {
    dispatch(fetchReviews());
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div>
      <h2>Leave a review to tell us what you think!</h2>
      <form onSubmit={handleSubmit}>
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
      <div>{/* {reviews.length} */}</div>
    </div>
  );
};

export default Reviews;
