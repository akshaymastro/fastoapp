import * as actionTypes from "./types";

const INIT_STATE = {
  ride: null,
  isLoggedIn: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_FARE:
      return {
        ...state,
        ride: action.payload,
      };
    default:
      return state;
  }
};
