import actionTypes from "./types";
import RestClient from "../../utils/RestClient";

export function showHome(params) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SHOW_HOME,
      payload: params,
    });
  };
}
export function saveApiToken(params) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SAVE_API_TOKEN,
      payload: params,
    });
  };
}
export const setDriverGeoLocation = (params) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LAT_LONG,
    payload: params,
  });
};
export function showLoading() {
  return {
    type: actionTypes.SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: actionTypes.HIDE_LOADING,
  };
}
