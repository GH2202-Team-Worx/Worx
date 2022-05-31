import axios from "axios";

const GET_REVIEWS = "GET_REVIEWS";

const _getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const fetchReviews = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/reviews");
    dispatch(_getReviews(data));
  };
};

export default function reviewReducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}
