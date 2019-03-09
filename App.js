import React from "react";
import { View, Text } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/MainReducer';
import Geocoder from 'react-native-geocoding';
import GOOGLE_API from './assets/data/credentials'

const store = createStore(friendReducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Geocoder.init(GOOGLE_API);
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>

    );
  }
}

