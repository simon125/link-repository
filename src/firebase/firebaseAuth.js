import { auth } from './firebaseInit';
/**
 * @param {string} email
 * @param {string} password
 */
export const registerUser = async (email, password) => {
  try {
    debugger;
    const user = await auth.createUserWithEmailAndPassword(email, password);
    debugger;
  } catch (error) {
    debugger;
    var errorCode = error.code;
    var errorMessage = error.message;
  }
};

/**
 * @param {string} email
 * @param {string} password
 */
export const loginUser = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    debugger;
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  }
};
