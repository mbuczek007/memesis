import firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
  apiKey: 'AIzaSyDBioRw1WfAn8XWP1k8jCLJhcxy5n2pUkk',
  authDomain: 'memesis-64751.firebaseapp.com',
  databaseURL: 'https://memesis-64751.firebaseio.com',
  projectId: 'memesis-64751',
  storageBucket: 'memesis-64751.appspot.com',
  messagingSenderId: '614093052746',
  appId: '1:614093052746:web:23846574b6a93669d63fb3',
  measurementId: 'G-6W3P5WTY99',
};

firebase.initializeApp(config);

export default firebase.firestore();
