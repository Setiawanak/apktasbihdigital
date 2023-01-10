import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {
  Alert,
  Button,
  Image,
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
import Berdoa from './src/screens/Berdoa';
import TestVoice from './src/screens/TestVoice';
import DetailSurah from './src/screens/DetailSurah';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import VoiceTest from './src/screens/TestVoice';
import SplashScreen from './src/screens/SplashScreen';
import messaging from '@react-native-firebase/messaging';

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
      <NativeStack.Screen component={ForgetPassword} name="ForgetPassword" />
    </NativeStack.Navigator>
  );
};

function MyTabs() {
  const {state, dispatch} = store();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: state.darkMode ? '#181a20' : '#F4F5F9',
        },
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
  const {state, dispatch} = store();

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

          headerStyle: {
            backgroundColor: state.darkMode ? '#181a20' : '#F4F5F9',
          },
          headerTintColor: state.darkMode ? '#F4F5F9' : '#181a20',
        }}
      />

      <NativeStack.Screen
        component={Bertasbih}
        name="Bertasbih"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: state.darkMode ? '#181a20' : '#F4F5F9',
          },
          headerTintColor: state.darkMode ? '#F4F5F9' : '#181a20',
        }}
      />
      <NativeStack.Screen component={Berdoa} name="Berdoa" />
      <NativeStack.Screen component={TestVoice} name="TestVoice" />
      <NativeStack.Screen
        component={DetailSurah}
        name="DetailSurah"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: state.darkMode ? '#181a20' : '#F4F5F9',
          },
          headerTintColor: state.darkMode ? '#F4F5F9' : '#181a20',
        }}
      />
    </NativeStack.Navigator>
  );
};

function MyDrawer() {
  const {state, dispatch} = store();

  let message =
    'Assalamualaikum wr wb, Aplikasi Tasbih Online digital: dibuat oleh Ade Kukuh Setiawan ';
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView
            contentContainerStyle={{
              flex: 1,
              backgroundColor: state.darkMode ? 'black' : 'white',
            }}
            {...props}>
            <View className="mb-5 -mt-2">
              <Image
                source={require('./src/images/splashscreen.png')}
                className="w-full "
                style={{
                  height: 150,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Tasbih Digital Online
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Versi 0.0.1
              </Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
              labelStyle={{
                color: state.darkMode ? 'white' : 'black',
              }}
              label="Github Repository"
              onPress={() =>
                Linking.openURL(
                  'https://github.com/Setiawanak/apktasbihdigital',
                )
              }
            />
            <DrawerItem
              labelStyle={{
                color: state.darkMode ? 'white' : 'black',
              }}
              label="Berikan Rating untuk Aplikasi"
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps?hl=id&gl=US',
                )
              }
            />
            <DrawerItem
              label="About US"
              labelStyle={{
                color: state.darkMode ? 'white' : 'black',
              }}
              onPress={() => Alert.alert('TASBIH DIGITAL', message)}
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
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('REMOTE MESSAGE', remoteMessage);
    });

    const unsubs = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    return unsubs;
  }, []);

  if (state.splash) {
    return <SplashScreen />;
  }

  if (state.isLogin) {
    return <MyDrawer />;
  } else {
    return <AuthStack />;
  }
};
