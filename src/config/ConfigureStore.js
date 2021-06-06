import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer, autoRehydrate} from 'redux-persist';
// import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import FilesystemStorage from 'redux-persist-filesystem-storage';
// reducer
import rootReducer from '../redux';

// encryptor
// import encryptor from './Encryption';

// persist config
const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  timeout: null,
  //   transforms: [encryptor],
  blacklist: ['network'], // normal reducer
  whitelist: ['auth', 'splash', 'common'], // for persist ,common
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  let persistor = persistStore(store);

  return {store, persistor};
};
