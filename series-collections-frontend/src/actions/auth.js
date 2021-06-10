import * as API from "../API/seriesCollections";

import { AUTH, LOGOUT } from "../constants";

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    dispatch({ type: AUTH, payload: data?.user });
  } catch (error) {
    alert("Login Failed!");
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch({ type: AUTH, payload: data?.user });
  } catch (error) {
    alert("Registration Failed!");
    console.log(error);
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
