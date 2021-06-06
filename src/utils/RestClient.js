import {baseUrl} from './urls';
import {Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

const deviceType = Platform.OS === 'ios' ? 'ios' : 'Android';
export default class RestClient {
  static async GetRequest(getState, endPoint) {
    // alert('it worked');
    if (typeof getState !== 'function') {
      throw new Error('getState parameter must be a function.');
    }
    const apiToken = getState().common.apiToken;
    // console.log('checking api token :: ', apiToken);
    let url = `${baseUrl}/${endPoint}`;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceType: deviceType,
      DeviceId: getUniqueId(),
      Authorization: apiToken,
    };
    try {
      const response = await fetch(url, {headers});
      let jsonResponse = {};

      jsonResponse = await response.json();
      jsonResponse.httpStatus = response.status;
      return Promise.resolve(jsonResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sends POST request to admin api, which is then forwarded to the correct customer api endpoint.
   * The request is validated in the admin api before forwarding.
   * @param {function} getState
   * @param {string} endPoint
   * @param {object} params
   */
  static async PostRequest(getState, endPoint, params) {
    if (typeof getState !== 'function') {
      throw new Error('getState parameter must be a function.');
    }
    let url = `${baseUrl}/${endPoint}`;
    const apiToken = getState().common.apiToken;
    var header = {};
    header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceType: deviceType,
      Authorization: apiToken,
      DeviceId: getUniqueId(),
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(params),
      });
      let jsonResponse = {};
      jsonResponse = await response.json();
      jsonResponse.httpStatus = response.status;
      return Promise.resolve(jsonResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sends PATCH request to admin api, which is then forwarded to the correct customer api endpoint.
   * The request is validated in the admin api before forwarding.
   * @param {function} getState
   * @param {string} endPoint
   * @param {object} params
   */
  static async PatchRequest(getState, endPoint, params) {
    if (typeof getState !== 'function') {
      throw new Error('getState parameter must be a function.');
    }
    let url = `${baseUrl}/${endPoint}`;
    const apiToken = getState().common.apiToken;
    var header = {};
    header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceType: deviceType,
      Authorization: apiToken,
      DeviceId: getUniqueId(),
    };
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify(params),
      });
      let jsonResponse = {};
      jsonResponse = await response.json();
      jsonResponse.httpStatus = response.status;
      return Promise.resolve(jsonResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async PostMultipart(getState, endPoint, file, params) {
    if (typeof getState !== 'function') {
      throw new Error('getState parameter must be a function.');
    }
    let url = `${baseUrl}/${endPoint}`;
    const formData = new FormData();

    if (file)
      formData.append('file', {
        name: file.fileName,
        type: file.type,
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri.replace('file://', ''),
      });
    formData.append('ParamData', JSON.stringify(params));

    var header = {};
    header = {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      deviceType: deviceType,
      DeviceId: getUniqueId(),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: formData,
      });
      let jsonResponse = {};
      jsonResponse = await response.json();
      jsonResponse.httpStatus = response.status;
      return Promise.resolve(jsonResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async PostMultipartArray(getState, endPoint, formData) {
    if (typeof getState !== 'function') {
      throw new Error('getState parameter must be a function.');
    }
    let url = `${baseUrl}/${endPoint}`;
    var header = {};
    header = {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      deviceType: deviceType,
      DeviceId: getUniqueId(),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: formData,
      });
      let jsonResponse = {};
      jsonResponse = await response.json();
      jsonResponse.httpStatus = response.status;
      return Promise.resolve(jsonResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
