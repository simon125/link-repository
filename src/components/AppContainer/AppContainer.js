import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';
import LinkForm from '../LinkForm/LinkForm';
import LinkTable from '../LinkTable/LinkTable';
import LinkCards from '../LinkCards/LinkCards';
import { db } from '../../firebase/firebaseInit';

const AppContainer = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [linksToDisplay, setLinksToDisplay] = useState([]);
  const [link, setLink] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    let unsubscribe1 = () => {};
    if (currentUser) {
      unsubscribe = db
        .collection('groups')
        .where('userUid', '==', currentUser.uid)
        .onSnapshot(function (querySnapshot) {
          const options = [];
          querySnapshot.forEach(function (doc) {
            options.push({ ...doc.data(), id: doc.id });
          });
          setGroups(options);
        });
      unsubscribe1 = db
        .collection('links')
        .where('userUid', '==', currentUser.uid)
        .onSnapshot(function (querySnapshot) {
          const links = [];
          querySnapshot.forEach(function (doc) {
            links.push({ ...doc.data(), id: doc.id });
          });
          setLinksToDisplay(links);
        });
    } else {
      setGroups([]);
      setLinksToDisplay([]);
    }
    return () => {
      unsubscribe();
      unsubscribe1();
    };
  }, [currentUser, link]);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleHideForm = () => setShowForm(false);

  return !!currentUser ? (
    // pt-5
    <div className="flex justify-around  relative flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start">
      <div className="w-full lg:w-2/5 xl:w-2/5 p-3">
        {showForm && (
          <LinkForm
            linkToEdit={link}
            availableGroups={groups}
            currentUser={currentUser}
          />
        )}
      </div>
      {!showForm && (
        <div className="w-full lg:w-3/5 xl:w-3/5 p-3">
          {window.innerWidth > 650 ? (
            <LinkTable
              setLink={setLink}
              linksToDisplay={linksToDisplay}
              availableGroups={groups}
            />
          ) : (
            <LinkCards
              availableGroups={groups}
              linksToDisplay={linksToDisplay}
            />
          )}
        </div>
      )}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          background: '#2d3748',
          width: '100%',
          height: 'fit-content',
        }}
        className="flex justify-end p-2"
      >
        {!showForm ? (
          <button
            onClick={handleShowForm}
            style={{ width: '40%' }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Link
          </button>
        ) : (
          <button
            onClick={handleHideForm}
            style={{ width: '40%' }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Show Links
          </button>
        )}
      </div>
    </div>
  ) : (
    // <Redirect to="/" />
    <>LOADING</>
  );
};

AppContainer.propTypes = {};

export default AppContainer;
