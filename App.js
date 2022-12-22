import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store, UserContextProvider} from './src/context';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ForgetPassword from './src/screens/ForgetPassword';
import HomeScreen from './src/screens/HomeScreen';

const NativeStack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UserContextProvider>
  );
}

// Untuk Kondisi component
const AuthStack = () => {
  return (
    <NativeStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <NativeStack.Screen component={LoginScreen} name="Login" />
      <NativeStack.Screen component={RegistrationScreen} name="Register" />
    </NativeStack.Navigator>
  );
};

const LoggedStack = () => {
  return (
    <NativeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <NativeStack.Screen component={HomeScreen} name="Home" />
    </NativeStack.Navigator>
  );
};

const Routes = () => {
  const {state, dispatch} = store();

  if (state.isLogin) {
    return <LoggedStack />;
  } else {
    return <AuthStack />;
  }
};
