import { FETCH_POPULAR_SERIES, SEARCH_SERIES } from "../constants";

const series = (series = [], action) => {
  switch (action.type) {
    case FETCH_POPULAR_SERIES:
      return action.payload;
    case SEARCH_SERIES:
      return action.payload;
    default:
      return series;
  }
};

export default series;
