import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);

    console.log('success save token');
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    console.log('success get token');
    return token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('success remove token');
  } catch (error) {
    console.log(error);
  }
};
