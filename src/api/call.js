import {API} from './config';
// import auth from '@react-native-firebase/auth';
import {firebase} from '../firebase/config';

export const login = async body => {
  try {
    console.log(body);

    const {data} = await API.post('/login', body);
    // const {data} = API.get('/test');
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkUser = async body => {
  try {
    console.log(body);

    const {data} = await API.get('/check?id=' + body);
    // const {data} = API.get('/test');
    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const register = async body => {
  try {
    console.log(body);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        body.uid = uid;
      })
      .catch(error => {
        alert(error);
      });

    const {data} = await API.post('/register', body);
    // const {data} = API.get('/test');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reset = async body => {
  try {
    console.log(body);

    const {data} = await API.post('/history', body);
    // const {data} = API.get('/test');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getHistory = async body => {
  try {
    console.log(body);

    const {data} = await API.get('/history?user_id=' + body);
    // const {data} = API.get('/test');
    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
