import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import SupportScreen from './SupportScreen';

import PassengerScreen from './PassengerScreen';
import DriverScreen from './DriverScreen';

const DetailsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="fasto"
    tabBarOptions={{
      activeTintColor: '#f9a602',
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOffset: {width: 40, height: 10},
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 20,
        zIndex: 999,
        backgroundColor: '#3b316f',
      },
    }}
    style={{
      backgroundColor: '#222546',
      padding: 5,
    }}>
    <Tab.Screen
      name="Home"
      component={DetailsScreen}
      options={{
        tabBarLabel: 'Notification',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        tabBarLabel: 'Rides',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <Icon name="md-stopwatch" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="fasto"
      component={HomeScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <LinearGradient
            colors={['#000', '#ec6513']}
            style={styles.buttonOutline}>
            <Image
              source={require('../assets/logo-final.png')}
              style={styles.buttonOutlineImage}
              resizeMode="cover"
              size={25}
            />
          </LinearGradient>
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Rewards',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Accounts',
        tabBarColor: '#fff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-wallet" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const ExploreStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#d02860',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        title: 'Payments',
        headerRight: () => (
          <Icon.Button
            name="ios-menu"
            size={35}
            backgroundColor="#d02860"
            color="#fff"
            onPress={() => {
              navigation.toggleDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const styles = StyleSheet.create({
  buttonOutline: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f9f9f9',
    shadowOffset: {width: 50, height: 20},
    shadowColor: '#fff',
    shadowOpacity: 1,
    elevation: 20,
    zIndex: 999999,
    marginBottom: 15,
  },
  buttonOutlineImage: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: 60,
    height: 60,    
    zIndex: 999999,

  },
});
