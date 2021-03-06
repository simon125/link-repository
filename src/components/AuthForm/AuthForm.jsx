import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { registerUser, loginUser, resetPassword } from '../../firebase/firebaseAuth';
import showToast from '../../utils';

const AuthForm = ({ currentUser }) => {
  const [email, setEmail] = useState({ value: '', error: null });
  const [password, setPassword] = useState({ value: '', error: null });
  const [repeatedPassword, setRepeatedPassword] = useState({
    value: '',
    error: null,
  });
  const [isRegisterForm, setIsRegisterForm] = useState(true);
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    const linkrepositoryEmail = localStorage.getItem('linkrepositoryEmail');
    const linkrepositoryPassword = localStorage.getItem('linkrepositoryPassword');
    if (linkrepositoryEmail && linkrepositoryPassword) {
      setEmail({ value: linkrepositoryEmail, error: null });
      setPassword({ value: linkrepositoryPassword, error: null });
      setIsRemembered(true);
      setIsRegisterForm(false);
    }
    if (currentUser && !(linkrepositoryEmail && linkrepositoryPassword)) {
      const cleanState = { value: '', error: null };
      setEmail(cleanState);
      setPassword(cleanState);
      setRepeatedPassword(cleanState);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let promise;
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    if (isRegisterForm) {
      promise = registerUser(email.value, password.value);
    } else {
      promise = loginUser(email.value, password.value);
    }

    promise.catch((err) => {
      if (err.code === 'auth/wrong-password') {
        setPassword({ ...password, error: err.message });
      }
    });
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email.value);

    if (!isEmailValid) {
      setEmail({ ...email, error: 'Please enter proper email' });
    }
    const isPasswordStrong = password.value && password.value.length >= 8;
    if (!isPasswordStrong && isRegisterForm) {
      setPassword({ ...password, error: 'Password is to weak!' });
    }
    // eslint-disable-next-line operator-linebreak
    const arePasswordsMatch =
      password.value && password.value.trim() !== '' && password.value === repeatedPassword.value;
    if (!arePasswordsMatch && isRegisterForm) {
      setPassword({ ...password, error: 'Repeated password is not the same!' });
      setRepeatedPassword({
        ...repeatedPassword,
        error: 'Repeated password is not the same!',
      });
    }
    return isEmailValid && ((isPasswordStrong && arePasswordsMatch) || !isRegisterForm);
  };

  const handleChange = (e) => {
    const data = { value: e.target.value, error: null };
    if (e.target.name === 'email') {
      setEmail(data);
    } else if (e.target.name === 'password') {
      setPassword(data);
    } else {
      setRepeatedPassword(data);
    }
  };

  const handleForgotPassword = () => {
    resetPassword(email.value)
      .then(() => {
        showToast('Your password has been changed, check your email', 'success');
      })
      .catch(() => {
        showToast('Enter valid email', 'error');
      });
  };

  const handleRememberMeChange = (e) => {
    if (e.target.checked && !isRemembered) {
      const isEmailValid = validateEmail(email.value);
      if (!isEmailValid) {
        setEmail({ ...email, error: 'Please enter proper email' });
      }
      const isPasswordStrong = password.value && password.value.length >= 8;
      if (!isPasswordStrong && isRegisterForm) {
        setPassword({ ...password, error: 'Password is to weak!' });
      }
      if (isEmailValid && isPasswordStrong) {
        localStorage.setItem('linkrepositoryEmail', email.value);
        localStorage.setItem('linkrepositoryPassword', password.value);
        setIsRemembered(true);
      }
    } else {
      localStorage.removeItem('linkrepositoryEmail');
      localStorage.removeItem('linkrepositoryPassword');
      const cleanState = { value: '', error: null };
      setEmail(cleanState);
      setPassword(cleanState);
      setRepeatedPassword(cleanState);
      setIsRemembered(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <span className="fas fa-link fa-4x h-12 block text-center" style={{ color: '#61DBFB' }} />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <div className="flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={() => setIsRegisterForm(true)}
              className={`bg-gray-${
                isRegisterForm ? 400 : 300
              } hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterForm(false)}
              className={`bg-gray-${
                isRegisterForm ? 300 : 400
              } hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
            >
              Log in
            </button>
          </div>
        </div>
        <form className="mt-8">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                onChange={handleChange}
                aria-label="Email address"
                name="email"
                type="email"
                value={email.value}
                required
                className={`${
                  email.error && 'border-red-500'
                } appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                placeholder="Email address"
              />
              {email.error && <p className="text-red-500 text-xs italic">{email.error}</p>}
            </div>
            <div className="-mt-px">
              <input
                onChange={handleChange}
                aria-label="Password"
                name="password"
                type="password"
                value={password.value}
                required
                className={`${
                  password.error && 'border-red-500'
                } appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                placeholder="Password"
              />
              {password.error && <p className="text-red-500 text-xs italic">{password.error}</p>}
            </div>
            {isRegisterForm && (
              <div className="-mt-px">
                <input
                  onChange={handleChange}
                  aria-label="Repeat Password"
                  name="repeatedPassword"
                  type="password"
                  value={repeatedPassword.value}
                  required
                  className={`${
                    repeatedPassword.error && 'border-red-500'
                  } appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                  placeholder="Repeat Password"
                />
                {repeatedPassword.error && (
                  <p className="text-red-500 text-xs italic">{repeatedPassword.error}</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                <input
                  checked={isRemembered}
                  onChange={handleRememberMeChange}
                  id="remember_me"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
                />
                Remember me
              </label>
            </div>

            <div className="text-sm leading-5">
              <button
                type="button"
                onClick={handleForgotPassword}
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              disabled={!!currentUser}
              onClick={handleSubmit}
              type="submit"
              className={`${
                !!currentUser && 'opacity-50 cursor-not-allowed'
              } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isRegisterForm ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
  }),
};

AuthForm.defaultProps = {
  currentUser: null,
};

// TODO: move this func to utils
function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default AuthForm;
