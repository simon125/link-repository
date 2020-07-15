import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';
import LinkForm from '../LinkForm/LinkForm';
import LinkTable from '../LinkTable/LinkTable';
import { db } from '../../firebase/firebaseInit';

const AppContainer = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [linksToDisplay, setLinksToDisplay] = useState([]);
  const [link, setLink] = useState({});

  useEffect(() => {
    if (currentUser) {
      db.collection('groups')
        .where('userUid', '==', currentUser.uid)
        .onSnapshot(function (querySnapshot) {
          const options = [];
          querySnapshot.forEach(function (doc) {
            options.push({ ...doc.data(), id: doc.id });
          });
          setGroups(options);
        });
      db.collection('links')
        .where('userUid', '==', currentUser.uid)
        .onSnapshot(function (querySnapshot) {
          const links = [];
          querySnapshot.forEach(function (doc) {
            links.push({ ...doc.data(), id: doc.id });
          });
          setLinksToDisplay(links);
        });
    }
  }, [currentUser, link]);

  return !!currentUser ? (
    <div className="flex justify-around pt-5 relative">
      <LinkForm
        linkToEdit={link}
        availableGroups={groups}
        currentUser={currentUser}
      />
      <div style={{ width: '60vw' }}>
        <LinkTable
          setLink={setLink}
          linksToDisplay={linksToDisplay}
          availableGroups={groups}
        />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

AppContainer.propTypes = {};

export default AppContainer;
