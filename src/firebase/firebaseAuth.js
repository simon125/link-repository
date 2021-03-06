import { auth } from './firebaseInit';

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logOut = () => {
  return auth.signOut();
};

export const resetPassword = (email = '') => {
  if (email && email.trim() !== '') {
    return auth.sendPasswordResetEmail(email);
  }
};
