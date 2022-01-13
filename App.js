import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';
import { Provider } from "react-redux";
import store from './src/redux/Store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeDetails from './src/screens/EmployeeDetails';
import InitialScreen from './src/screens/InitialScreen';
//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, CITY_ARRAY } from "../redux/Action";

const Stack = createNativeStackNavigator();
const StackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
    </Stack.Navigator>
  )
}
const InitialStack = () => {
  
  const [isCitySelected,setIsCitySelected] = useState(true)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        console.warn("city found", value)
        setIsCitySelected(false)
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.log("error when get city")
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isCitySelected==false?"InitialScreen" : "StackScreens"}>
        {console.log("isCitySelected true or false",isCitySelected)}
      <Stack.Screen name="StackScreens" component={StackScreens} />
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <InitialStack />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
