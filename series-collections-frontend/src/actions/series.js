import * as API from "../API/imdb";
import { FETCH_POPULAR_SERIES, SEARCH_SERIES } from "../constants";

export const fetchMostPopularTVs = () => async (dispatch) => {
  try {
    const { data } = await API.fetchMostPopularTVs();
    dispatch({ type: FETCH_POPULAR_SERIES, payload: data.results });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchSeries = (seriesName) => async (dispatch) => {
  try {
    const { data } = await API.searchSeries(seriesName);

    dispatch({ type: SEARCH_SERIES, payload: data.results });
  } catch (error) {
    console.log(error.message);
  }
};
