import * as API from "../API/seriesCollections";
import { GET_WL } from "../constants";

export const getWatchList = () => async (dispatch) => {
  try {
    const { data } = await API.getList("w");
    dispatch({ type: GET_WL, payload: data.watchlist });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateWatchList = (id) => async (dispatch) => {
  try {
    const { data } = await API.updateDefaultList("w", id);
    dispatch({ type: GET_WL, payload: data.watchlist });
  } catch (error) {
    console.log(error.message);
  }
};
