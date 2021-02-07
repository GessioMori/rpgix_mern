import { AUTH, AUTH_ERROR } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, payload: data });
    router.push("/dashboard");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, payload: data });
    router.push("/dashboard");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};
