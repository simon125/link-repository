import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyA1i3lrHXvFPKj_EAZk5axjV928jVbTGng',
  authDomain: 'link-repository.firebaseapp.com',
  databaseURL: 'https://link-repository.firebaseio.com',
  projectId: 'link-repository',
  storageBucket: 'link-repository.appspot.com',
  messagingSenderId: '479817988265',
  appId: '1:479817988265:web:c3d9420f29ea600c5d51b8',
  measurementId: 'G-0G9TZDNZC4',
};
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
