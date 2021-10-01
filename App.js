/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';

import { store } from './src/Redux/Store';
import RootNavigation from './src/Navigation/RootNavigation';

const App = () => {
  return (
    <Provider store={store} >
      <RootNavigation/>
    </Provider>
  );
};

export default App;
