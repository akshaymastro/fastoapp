/**
 * @Piyush_Bajpai
 * Action to track the internet connection.
 */

import actionTypes from './types';

export function networkReachability(isOnline) {
  return {
    type: actionTypes.NETWORK_REACHABILITY,
    payload: isOnline,
  };
}
