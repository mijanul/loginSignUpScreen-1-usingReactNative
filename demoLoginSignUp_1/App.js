/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CreateAccount from './src/screens/CreateAccount';
import SignIn from './src/screens/SignIn';




const AppNavigator = createStackNavigator({
 
  CreateAccount: {
    screen: CreateAccount
  },
  SignIn: {
    screen: SignIn
  }
}, 
{
  //Add this property to hide the navigation bar at top from all the screens 
  defaultNavigationOptions: {
    headerShown: false
  },
},
{
    initialRouteName: 'CreateAccount',
});

export default createAppContainer(AppNavigator);
