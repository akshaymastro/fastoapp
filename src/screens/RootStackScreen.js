import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './Login';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
