import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';
import { Provider } from "react-redux";
import store from './src/redux/Store';

const App = () => {
  return (
    <Provider store = {store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Root />
      </SafeAreaView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
