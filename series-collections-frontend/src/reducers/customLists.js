import {
  CREATE_CUSTOM_LIST,
  DELETE_CUSTOM_LIST,
  GET_ALL_CUSTOM_LISTS,
  UPDATE_CUSTOM_LIST,
} from "../constants";

const customLists = (customLists = [], action) => {
  switch (action.type) {
    case GET_ALL_CUSTOM_LISTS:
      return action.payload;
    case CREATE_CUSTOM_LIST:
      return [...customLists, action.payload];
    case DELETE_CUSTOM_LIST:
      return customLists.filter((list) => list._id !== action.payload);
    case UPDATE_CUSTOM_LIST:
      return customLists.map((list) =>
        list._id === action.payload._id ? action.payload : list
      );
    default:
      return customLists;
  }
};

export default customLists;
