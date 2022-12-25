import {View, Text, Image, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {store} from '../context';
import {getToken} from '../hooks';
import {checkUser} from '../api/call';

const SplashScreen = () => {
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
    setTimeout(() => {
      dispatch({type: 'TURN_OFF_SPLASH'});
    }, 1000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Image source={require('../images/splashscreen.png')} />
    </View>
  );
};

export default SplashScreen;
