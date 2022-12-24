import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {
  Button,
  Linking,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store, UserContextProvider} from './src/context';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ForgetPassword from './src/screens/ForgetPassword';
import HomeScreen from './src/screens/HomeScreen';
import {getToken} from './src/hooks';
import {checkUser} from './src/api/call';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Bertasbih from './src/screens/Bertasbih';
import Profile from './src/screens/Profile';
import Alquran from './src/screens/Alquran';
import DetailSurah from './src/screens/DetailSurah';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import VoiceTest from './src/screens/TestVoice';

const Drawer = createDrawerNavigator();
const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profle"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const LoggedStack = () => {
  return (
    <NativeStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <NativeStack.Screen component={MyTabs} name="Main" />
      <NativeStack.Screen
        component={Alquran}
        name="Alquran"
        options={{
          headerShown: true,
        }}
      />
      <NativeStack.Screen component={Bertasbih} name="Bertasbih" />
      <NativeStack.Screen
        component={DetailSurah}
        name="DetailSurah"
        options={{
          headerShown: true,
        }}
      />
    </NativeStack.Navigator>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Github"
              onPress={() => Linking.openURL('http://google.com')}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={LoggedStack} />
    </Drawer.Navigator>
  );
}

const Routes = () => {
  const {state, dispatch} = store();
  const isDarkMode = useColorScheme() === 'dark';

  const checkLogin = async () => {
    const token = await getToken();

    if (!token) {
      return;
    }

    const user = await checkUser(+token);
    dispatch({type: 'LOGIN', payload: user});
  };

  useEffect(() => {
    checkLogin();
    dispatch({type: 'SET_DARK_MODE', payload: isDarkMode});
  }, []);

  if (state.isLogin) {
    return <MyDrawer />;
  } else {
    return <AuthStack />;
  }
};
