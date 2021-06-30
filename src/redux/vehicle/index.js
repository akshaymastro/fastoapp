import * as actionTypes from "./types";
// initial state
const INIT_STATE = {
  vehicle: null,
  category: null,
  isLoggedIn: false,
  rideData: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case actionTypes.SET_RIDE_VALUE:
      return {
        ...state,
        rideData: {
          ...state.rideData,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionTypes.SET_SELECTED_RIDE:
      return{
        ...state,
        selectedRide: action.payload
      }
    case actionTypes.NEW_RIDE:
      return{
        ...state,
        currentRide: action.payload
      }
    case actionTypes.CURRENT_RIDE:
      return{
        ...state,
        current: action.payload
      }
    case actionTypes.CLEAR_USER:
      return INIT_STATE;

    default:
      return state;
  }
};
