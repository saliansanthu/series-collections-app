import { combineReducers } from "redux";
import series from "./series";
import auth from "./auth";
import favorites from "./favorites";
import watchlist from "./watchlist";
import customLists from "./customLists";
import { RESET_STORE } from "../constants";

const appReducer = combineReducers({
  series,
  auth,
  favorites,
  watchlist,
  customLists,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
