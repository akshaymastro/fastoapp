import RestClient from "../../utils/RestClient";
import * as actionTypes from "./types";

export function getFare(params) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      // dispatch(showLoading());
      const request = `basefare/getfare/`;
      RestClient.PostRequest(getState, request, params)
        .then((result) => {
          // dispatch(hideLoading());
          //   callback(result);
          dispatch({
            type: actionTypes.GET_FARE,
            payload: result.data,
          });
        })
        .catch((error) => {
          //   dispatch(hideLoading());
          console.log("login response error :: ", error);
        });
    } else {
      //   dispatch(hideLoading());
      alert("Please check your internet connection");
    }
  };
}
