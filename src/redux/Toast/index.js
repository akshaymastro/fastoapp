import { PURGE } from "redux-persist";
import actionTypes from "./types";

// initial state
const INIT_STATE = {
  showSnackConfirmation: false,
};

export default function toastReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.SHOW_CONFIRMATION:
      return {
        ...state,
        showSnackConfirmation: action.payload,
      };

    default:
      return state;
  }
}
