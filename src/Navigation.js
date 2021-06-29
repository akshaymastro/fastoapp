import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useFocusEffect,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {View, ActivityIndicator} from 'react-native';
//import store from './screens/redux/store';
import configureStore from './config/ConfigureStore';
// const store = createStore(reducers, applyMiddleware(thunk));
const {store, persistor} = configureStore();
import DrawerContent from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/howToBookScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import AboutScreen from './screens/aboutScreen';
import DetailsScreen from './screens/DetailsScreen';
import PassengerScreen from './screens/PassengerScreen';
import InviteEarn from './screens/InviteEarn';
import DriverScreen from './screens/DriverScreen';
import {AuthContext} from './component/context';
import RootStackScreen from './screens/RootStackScreen';
import ProfileUpdate from './screens/ProfileUpdate';
import Wallet from './screens/Wallet/Wallet'

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './screens/Login';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import PhoneVerify from './screens/VerifyPage/PhoneVerify';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
  return (
    // <Drawer.Navigator
    //   initialRouteName="Home"
    //   drawerContentOptions={{
    //     labelStyle: {fontSize: fontSizes(14)},
    //   }}
    //   drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="InviteEarn" component={InviteEarn} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="DriverScreen" component={DriverScreen} />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
    </Drawer.Navigator>
  );
}

const loginRoot = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="PhoneVerify" component={PhoneVerify} />
    </Stack.Navigator>
  );
};

export default Navigation = props => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case 'RETRIEVE_TOKEN':
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGIN':
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT':
  //       return {
  //         ...prevState,
  //         userName: null,
  //         userToken: null,
  //         isLoading: false,
  //       };
  //     case 'REGISTER':
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //   }
  // };

  // const [loginState, dispatch] = React.useReducer(
  //   loginReducer,
  //   initialLoginState,
  // );

  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async foundUser => {
  //       //console.log('json value' + " " +  foundUser);
  //       // setUserToken('fgkj');
  //       // setIsLoading(false);
  //       // const userToken = String(foundUser[0].userToken);
  //       // const userName = foundUser[0].username;
  //       // console.log('From App.js' + ' ' + foundUser)
  //       //let jsonvalue = await AsyncStorage.setItem('userToken',JSON.stringify(foundUser));
  //       console.log('FOUND USER' + ' ' + foundUser);
  //       let jsonvalueobj = JSON.parse(foundUser);
  //       let userToken = jsonvalueobj;
  //       let stringifyd = JSON.stringify(userToken);
  //       /*
  //      const userName = foundUser[0].username;

  //      */

  //       try {
  //         await AsyncStorage.setItem('userToken', userToken.token);
  //       } catch (e) {
  //         console.log(e);
  //       }

  //       dispatch({
  //         type: 'LOGIN',
  //         id: userToken.user.Mobile,
  //         token: userToken.token,
  //       });
  //     },
  //     signOut: async () => {
  //       try {
  //         await AsyncStorage.removeItem('USER');
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       dispatch({type: 'LOGOUT'});
  //     },
  //     signUp: () => {},
  //     toggleTheme: () => {
  //       setIsDarkTheme(isDarkTheme => !isDarkTheme);
  //     },
  //     // UserValues: (values) => {
  //     //     console.log(values)
  //     // }
  //   }),
  //   [],
  // );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          // initialRouteName={'ProfileUpdate'}
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="login" component={loginRoot} />
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="WalletScreen" component={Wallet} />
          <Drawer.Screen name="InviteEarn" component={InviteEarn} />
          <Drawer.Screen name="AboutScreen" component={AboutScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Drawer.Screen name="DriverScreen" component={DriverScreen} />
          <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
