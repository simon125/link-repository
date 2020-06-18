import React from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import AuthForm from './components/AuthForm/AuthForm';
import About from './components/About/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { db } from './firebase/firebaseInit';

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <div style={{ marginTop: '15%' }}>
                <AuthForm />
              </div>
            )}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
