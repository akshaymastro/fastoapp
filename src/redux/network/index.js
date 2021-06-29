import { PURGE } from "redux-persist";
import actionTypes from "./types";

// initial state
const INIT_STATE = {
  loading: false,
  isOnline: undefined
};

export default function networkReducer(state = INIT_STATE, action) {
  switch (action.type) {

    case actionTypes.NETWORK_REACHABILITY:
      return {
        ...state,
        isOnline: action.payload,
      };
    default:
      return state;
  }
}
