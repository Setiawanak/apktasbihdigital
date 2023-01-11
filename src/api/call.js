import {API} from './config';
// import auth from '@react-native-firebase/auth';
import {firebase} from '../firebase/config';
import firestore from '@react-native-firebase/firestore';

export const login = async body => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(body.email, body.password);

    const data = await firestore()
      .collection('users')
      .doc(body.email)
      // Filter results
      .get();

    return data.data();
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
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(body.email, body.password);

    const uid = response.user.uid;
    body.uid = uid;
    console.log(body);
    await firestore().collection('users').doc(body.email).set(body);

    firebase.auth().signOut();
    // const {data} = API.get('/test');
    return body;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reset = async body => {
  try {
    console.log(body);
    const d = new Date();
    body.tanggal = d.toLocaleDateString('id-ID');
    body.waktu = d.toLocaleTimeString('id-ID');

    await firestore().collection('users_history').add(body);

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

    const data = await firestore()
      .collection('users_history')
      // Filter results
      .where('email', '==', body)
      .orderBy('tanggal', 'desc')
      .orderBy('waktu', 'desc')
      .get();

    console.log(data.docs);

    // const {data} = API.get('/test');
    return data.docs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resetPassword = async body => {
  try {
    console.log(body);

    const data = await firebase.auth().sendPasswordResetEmail(body);

    console.log(data);

    // const {data} = API.get('/test');
    return [true, data];
  } catch (error) {
    return [false, error];
  }
};
