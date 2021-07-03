import RestClient from "../../utils/RestClient";
import * as actionTypes from "./types";

export function getVehicleList(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `vehical/`;

      RestClient.GetRequest(getState, request)
        .then((result) => {
          //   dispatch(hideLoading());
          console.log(result, "reuslslsl");
          //   callback(result);
          dispatch({
            type: actionTypes.GET_VEHICLE,
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

export function setRideData(params) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      dispatch({
        type: actionTypes.SET_RIDE_VALUE,
        payload: { key: params.key, value: params.value },
      });
    }
  };
}
export function bookRide(params) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `rides/createride`;
      console.log(params, "paramss");
      RestClient.PostRequest(getState, request, params)
        .then((result) => {
          //   dispatch(hideLoading());
          console.log(result, "rideeee");
          //   callback(result);
          dispatch({
            type: actionTypes.NEW_RIDE,
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

export function getCurrentRide(params) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `rides/currentRide`;
      console.log(params, "paramss");
      RestClient.PostRequest(getState, request, { _id: params })
        .then((result) => {
          //   dispatch(hideLoading());
          console.log(result, "rideeee");
          //   callback(result);
          dispatch({
            type: actionTypes.CURRENT_RIDE,
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

export const rideAccepted = () => (dispatch) => {
  dispatch({
    type: actionTypes.RIDE_STATUS,
    payload: true,
  });
};
export function selectRide(params) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;

    if (isOnline) {
      //   dispatch(showLoading());
      const request = `rides/createride`;
      console.log(params, "paramss");
      dispatch({
        type: actionTypes.SET_SELECTED_RIDE,
        payload: params,
      });
    } else {
      //   dispatch(hideLoading());
      alert("Please check your internet connection");
    }
  };
}

export function getCategoryList(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `category/`;

      RestClient.GetRequest(getState, request)
        .then((result) => {
          //   dispatch(hideLoading());
          console.log(result, "categoryy");
          //   callback(result);
          dispatch({
            type: actionTypes.GET_CATEGORY,
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
