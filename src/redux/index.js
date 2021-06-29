/*
 * @file: index.js
 * @description: Combining all the reducers into one.
 * @date: 4th August 2020
 * @author: Ravi
 */

import { combineReducers } from "redux";
import commonReducer from "./common";

// import splashReducer from './splash';
import authReducer from "./auth";
import toastReducer from "./Toast";
import networkReducer from "./network";
import vehicleReducer from "./vehicle";

const rootReducer = combineReducers({
  toastReducer: toastReducer,
  network: networkReducer,
  common: commonReducer,
  vehicle: vehicleReducer,
  auth: authReducer,
  // splash: splashReducer,
});

export default rootReducer;
