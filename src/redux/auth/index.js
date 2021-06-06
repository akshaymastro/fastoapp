import actionTypes from './types';
// initial state
const INIT_STATE = {
  user: null,
  userDetails: null,
  isLoggedIn: false,
};

export default function loginUser(state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case actionTypes.CLEAR_USER:
      return INIT_STATE;

    default:
      return state;
  }
}
