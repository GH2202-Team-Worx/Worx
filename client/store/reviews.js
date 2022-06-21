import axios from "axios";

const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

const _getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const fetchReviews = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/reviews");
    dispatch(_getReviews(data));
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const { data: createdReview } = await axios.post("/api/reviews", review);
      dispatch(_addReview(createdReview));
    } catch (err) {
      console.log("Unable to post review", err);
    }
  };
};

export default function reviewReducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
}
