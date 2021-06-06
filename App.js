/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/ConfigureStore';
import AppNavigator from './src';
import Loader from './src/common/components/Loader';

const {store, persistor} = configureStore();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
          <Loader />
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;
