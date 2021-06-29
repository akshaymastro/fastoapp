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
          // console.log(result, "reuslslsl");
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
          // console.log(result, "rideeee");
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
export function getCategoryList(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `category/`;

      RestClient.GetRequest(getState, request)
        .then((result) => {
          //   dispatch(hideLoading());
          // console.log(result, "categoryy");
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

// My-function,
export function getAvailableTrips() {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      //   dispatch(showLoading());
      const request = `rides/`;
      const params = {};
      RestClient.PostRequest(getState, request, params)
        .then((result) => {
          //   dispatch(hideLoading());
          // console.log(result, "rahul-vishal");
          //   callback(result);
          dispatch({
            type: actionTypes.GET_AVAILABLE_TRIPS,
            payload: result.data,
          });
        })
        .catch((error) => {
          //   dispatch(hideLoading());
          console.log("login response error :: ", error);
          // alert(error);
        });
    } else {
      //   dispatch(hideLoading());
      alert("Please check your internet connection");
    }
  };
}
