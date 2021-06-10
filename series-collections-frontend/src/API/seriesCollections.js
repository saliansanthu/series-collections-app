import axios from "axios";

const API = axios.create({
  baseURL: "https://series-collections.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

//AUTH
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

//series-collections
export const getList = (listChar) =>
  API.get(`/series-collections/default-lists/${listChar}`);
export const updateDefaultList = (listChar, id) =>
  API.patch(`/series-collections/default-lists/${listChar}/${id}`);
export const getCustomLists = () => API.get(`/series-collections/custom-lists`);
export const createCustomList = (customList) =>
  API.post(`/series-collections/custom-lists`, customList);
export const deleteCustomList = (listId) =>
  API.delete(`/series-collections/custom-lists/${listId}`);
export const updateCustomList = (listId, itemId) =>
  API.patch(`/series-collections/custom-lists/${listId}/${itemId}`);
