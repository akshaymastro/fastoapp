import actionTypes from './types';
import {PURGE} from 'redux-persist';
import {showLoading, hideLoading} from '../common/actions';

import RestClient from '../../utils/RestClient';

export function authenticateUser(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      dispatch(showLoading());
      const request = `auth/sendDriverOtp`;

      RestClient.PostRequest(getState, request, params)
        .then(result => {
          dispatch(hideLoading());
          callback(result);
        })
        .catch(error => {
          dispatch(hideLoading());
          console.log('login response error :: ', error);
        });
    } else {
      dispatch(hideLoading());
      alert('Please check your internet connection');
    }
  };
}

export function updateUserProfile(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      dispatch(showLoading());
      const request = `users/updateuser`;

      RestClient.PatchRequest(getState, request, params)
        .then(result => {
          dispatch(hideLoading());
          callback(result);
        })
        .catch(error => {
          dispatch(hideLoading());
          console.log('login response error :: ', error);
        });
    } else {
      dispatch(hideLoading());
      alert('Please check your internet connection');
    }
  };
}

export function fetchUserDetails(callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      dispatch(showLoading());
      // dispatch(hideLoading());
      const request = `auth/getuser`;

      RestClient.GetRequest(getState, request)
        .then(result => {
          console.log('checking get user res:: ', result);
          dispatch(hideLoading());
          dispatch({
            type: actionTypes.USER_DETAILS,
            payload: result.data,
          });
          callback(result);
        })
        .catch(error => {
          dispatch(hideLoading());
          console.log('login response error :: ', error);
        });
    } else {
      dispatch(hideLoading());
      alert('Please check your internet connection');
    }
  };
}

export function verifyOtpHandler(params, callback) {
  return (dispatch, getState) => {
    const isOnline = getState().network.isOnline;
    if (isOnline) {
      dispatch(showLoading());
      const request = `auth/verifydriverOtp`;

      RestClient.PostRequest(getState, request, params)
        .then(result => {
          dispatch(hideLoading());
          callback(result);
        })
        .catch(error => {
          dispatch(hideLoading());
          console.log('login response error :: ', error);
        });
    } else {
      dispatch(hideLoading());
      alert('Please check your internet connection');
    }
  };
}
