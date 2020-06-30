import React, { useState, useEffect } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import AuthForm from './components/AuthForm/AuthForm';
import About from './components/About/About';
import AppContainer from './components/AppContainer/AppContainer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { app } from './firebase/firebaseInit';

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
              <div style={{ marginTop: '13%' }}>
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
    </div>
  );
}

export default App;
