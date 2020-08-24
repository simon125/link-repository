import { auth } from './firebaseInit';

export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * @param {string} email
 * @param {string} password
 */
export const registerUser = async (email, password) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  }
};

/**
 * @param {string} email
 * @param {string} password
 */
export const loginUser = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logOut = async () => {
  return auth.signOut();
};

export const resetPassword = async (email = '') => {
  if (email && email.trim() !== '') {
    return auth.sendPasswordResetEmail(email);
  }
};
