import * as API from "../API/seriesCollections";
import {
  CREATE_CUSTOM_LIST,
  DELETE_CUSTOM_LIST,
  GET_ALL_CUSTOM_LISTS,
  UPDATE_CUSTOM_LIST,
} from "../constants";

export const getCustomLists = () => async (dispatch) => {
  try {
    const { data } = await API.getCustomLists();
    dispatch({ type: GET_ALL_CUSTOM_LISTS, payload: data.lists });
  } catch (error) {
    console.log(error);
  }
};

export const createCustomList = (customList) => async (dispatch) => {
  try {
    const { data } = await API.createCustomList(customList);
    dispatch({ type: CREATE_CUSTOM_LIST, payload: data.list });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCustomList = (listId) => async (dispatch) => {
  try {
    await API.deleteCustomList(listId);
    dispatch({ type: DELETE_CUSTOM_LIST, payload: listId });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCustomList = (listId, itemId) => async (dispatch) => {
  try {
    const { data } = await API.updateCustomList(listId, itemId);
    dispatch({ type: UPDATE_CUSTOM_LIST, payload: data.list });
  } catch (error) {
    console.log(error.message);
  }
};
