import * as types from '../../action/action.type';

const initialState = {
  loginUser: null,
};

export const loginUser = (state = initialState, action) => {
  //   alert('called ');
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: action.payload,
      };

    default:
      return state;
  }
};
export default loginUser;
