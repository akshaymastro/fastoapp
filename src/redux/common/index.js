import actionTypes from "./types";
import { PURGE } from "redux-persist";

// initial state
const INIT_STATE = {
  loading: false,
  showHome: false,
  apiToken: "",
  userDetails: "",
};

export default function common(state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_LAT_LONG: {
      return {
        ...state,
        location: {
          lat: action.payload.lat,
          long: action.payload.long,
        },
      };
    }
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SHOW_HOME:
      return {
        ...state,
        showHome: action.payload,
      };
    case actionTypes.SAVE_API_TOKEN:
      return {
        ...state,
        apiToken: action.payload,
      };
    case actionTypes.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    default:
      return state;
  }
}
