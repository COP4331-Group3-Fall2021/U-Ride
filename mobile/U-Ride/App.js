import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './src/screens/LoginScreen';
import CardScreen from './src/screens/CardScreen';
import image from 'react-native'


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null // Will hide header for HomePage
    }
  },
  Card: {
    screen: CardScreen,
    navigationOptions: {
      header: null // Will hide header for HomePage
    }
  }
},{
  initialRouteName: "Login"
});
const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
