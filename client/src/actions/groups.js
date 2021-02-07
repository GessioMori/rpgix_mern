import * as api from "../api/index.js";

export const createGroup = (group) => async (dispatch) => {
  try {
    const { data } = await api.createGroup(group);
    dispatch({ type: "CREATEGROUP", payload: data });
  } catch (error) {
    dispatch({ type: "NEWGROUP_ERROR", payload: error.response.data?.message });
  }
};

export const enterGroup = (code) => async (dispatch) => {
  try {
    const { data } = await api.enterGroup(code);
    dispatch({ type: "ENTER_GROUP", payload: data });
  } catch (error) {
    dispatch({
      type: "ENTER_GROUP_ERROR",
      payload: error.response.data?.message,
    });
  }
};

export const getGroup = (id) => async (dispatch) => {
  try {
    const { data } = await api.getGroup(id);
    dispatch({ type: "GET_GROUP", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_GROUP_ERROR",
      payload: error.response?.data?.message,
    });
  }
};
