import * as API from "../API/seriesCollections";
import { GET_FAV } from "../constants";

export const getFav = () => async (dispatch) => {
  try {
    const { data } = await API.getList("f");
    dispatch({ type: GET_FAV, payload: data.favorites });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFav = (id) => async (dispatch) => {
  try {
    const { data } = await API.updateDefaultList("f", id);
    dispatch({ type: GET_FAV, payload: data.favorites });
  } catch (error) {
    console.log(error.message);
  }
};
