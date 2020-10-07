/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthForm from './components/AuthForm/AuthForm';
import Navigation from './components/Navigation/Navigation';
import {
  setCollectionListener,
  COLLECTION_LINKS,
  COLLECTION_GROUPS,
} from './firebase/firebaseCRUD';
import { app } from './firebase/firebaseInit';
import About from './views/About/About';
import AppContainer from './views/App/AppContainer';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [linksToDisplay, setLinksToDisplay] = useState([]);
  const [showSpinner, setShowSpinner] = useState(null);

  let unsubscribeGroupsListener = () => {};
  let unsubscribeLinksListener = () => {};

  useEffect(() => {
    const unregisterAuthObserver = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }

      if (currentUser) {
        setShowSpinner(true);
        unsubscribeGroupsListener = setCollectionListener(
          COLLECTION_GROUPS,
          currentUser.uid,
          setGroups,
        );
        unsubscribeLinksListener = setCollectionListener(
          COLLECTION_LINKS,
          currentUser.uid,
          (collection) => {
            setLinksToDisplay(collection);
            setShowSpinner(false);
          },
        );
      } else {
        setGroups([]);
        setLinksToDisplay([]);
        unsubscribeGroupsListener();
        unsubscribeLinksListener();
      }
      return () => {
        unsubscribeGroupsListener();
        unsubscribeLinksListener();
      };
    });
    return () => unregisterAuthObserver();
  }, [currentUser]);

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
            component={() => (
              <AppContainer
                currentUser={currentUser}
                groups={groups}
                linksToDisplay={linksToDisplay}
                showSpinner={showSpinner}
              />
            )}
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
