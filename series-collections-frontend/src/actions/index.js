import { RESET_STORE } from "../constants";

export const resetStore = () => (dispatch) => {
  dispatch({ type: RESET_STORE });
};
