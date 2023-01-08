import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'YAIzaSyCGlPpVEEumppktZ28bv7M8_d4Jul1chLo',
  projectId: 'e-count-tasbih-digital',
  storageBucket: 'your-project-id-1234.appspot.com',
  appId: '',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
