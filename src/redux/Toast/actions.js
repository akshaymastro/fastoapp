import actionTypes from "./types";

export function showConfirmation(params) {
  return {
    type: actionTypes.SHOW_CONFIRMATION,
    payload: params,
  };
}
