import { auth } from './firebaseInit';

export const getCurrentUser = () => {
  return auth.currentUser;
};

// auth.onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//     console.log('user: ', user);
//   } else {
//     console.log('user: ', user);
//     // No user is signed in.
//   }
// });

/**
 * @param {string} email
 * @param {string} password
 */
export const registerUser = async (email, password) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    debugger;
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    debugger;
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
