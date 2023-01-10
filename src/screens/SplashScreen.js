import {View, Text, Image, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {store} from '../context';
import {getToken} from '../hooks';
import {checkUser} from '../api/call';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = () => {
  const {state, dispatch} = store();
  const isDarkMode = useColorScheme() === 'dark';

  const checkLogin = async user => {
    console.log(user);
    if (!user) {
      return;
    }
    const data = await firestore()
      .collection('users')
      .doc(user.email)
      // Filter results
      .get();

    dispatch({type: 'LOGIN', payload: data.data()});
  };

  useEffect(() => {
    dispatch({type: 'SET_DARK_MODE', payload: isDarkMode});
    const subscriber = auth().onAuthStateChanged(checkLogin);

    setTimeout(() => {
      dispatch({type: 'TURN_OFF_SPLASH'});
    }, 1000);
    return subscriber; //
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Image source={require('../images/splashscreen.png')} />
    </View>
  );
};

export default SplashScreen;
