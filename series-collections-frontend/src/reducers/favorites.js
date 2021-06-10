import { GET_FAV } from "../constants";

const favorites = (favorites = [], action) => {
  switch (action.type) {
    case GET_FAV:
      return action.payload;
    default:
      return favorites;
  }
};

export default favorites;
