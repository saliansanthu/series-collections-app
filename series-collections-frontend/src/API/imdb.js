import axios from "axios";

const tmdbApiKey = process.env.REACT_APP_TMDB_API;

const imdb = axios.create({ baseURL: "https://api.themoviedb.org/3" });

export const fetchMostPopularTVs = () =>
  imdb.get(`/trending/tv/day?api_key=${tmdbApiKey}`);

export const searchSeries = (seriesName) =>
  imdb.get(
    `/search/tv?api_key=${tmdbApiKey}&query=${seriesName}&include_adult=true`
  );

export const getSeries = async (seriesId) =>
  imdb.get(`/tv/${seriesId}?api_key=${tmdbApiKey}&language=en-US`);
