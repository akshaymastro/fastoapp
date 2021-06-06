import actionTypes from './types';

// initial state
const INIT_STATE = {
  translations: [],
  languageId: 1,
  translationsNorway: [],
};

export default function splashReducer(state = INIT_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
