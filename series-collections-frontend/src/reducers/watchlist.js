import { GET_WL } from "../constants";

const watchlist = (watchlist = [], action) => {
  switch (action.type) {
    case GET_WL:
      return action.payload;
    default:
      return watchlist;
  }
};

export default watchlist;
