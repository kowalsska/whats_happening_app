import React from "react";
import { View, Text } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import Geocoder from 'react-native-geocoding';
import GOOGLE_API from './assets/data/credentials'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Geocoder.init(GOOGLE_API);
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}

