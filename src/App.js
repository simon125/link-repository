/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import About from './components/About/About';
import AppContainer from './components/AppContainer/AppContainer';
import AuthForm from './components/AuthForm/AuthForm';
import Navigation from './components/Navigation/Navigation';
import { app } from './firebase/firebaseInit';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="min-h-screen">
      <Router>
        <Navigation currentUser={currentUser} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <div style={{ marginTop: '5%' }}>
                <AuthForm currentUser={currentUser} />
              </div>
            )}
          />
          <Route
            path="/app"
            component={() => <AppContainer currentUser={currentUser} />}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
