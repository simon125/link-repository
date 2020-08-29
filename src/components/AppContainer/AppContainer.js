import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';
import LinkForm from '../LinkForm/LinkForm';
import LinkTable from '../LinkTable/LinkTable';
import LinkCards from '../LinkCards/LinkCards';
import { db } from '../../firebase/firebaseInit';
import {
  setCollectionListener,
  COLLECTION_LINKS,
  COLLECTION_GROUPS,
} from '../../firebase/firebaseCRUD';

const AppContainer = ({ currentUser }) => {
  const [groups, setGroups] = useState([]);
  const [linksToDisplay, setLinksToDisplay] = useState([]);
  const [link, setLink] = useState({});
  const [showForm, setShowForm] = useState(false);

  const IS_SMALL_SCREEN = window.innerWidth < 650;

  useEffect(() => {
    let unsubscribeGroupsListener = () => {};
    let unsubscribeLinksListener = () => {};
    if (currentUser) {
      unsubscribeGroupsListener = setCollectionListener(
        COLLECTION_GROUPS,
        currentUser.uid,
        setGroups
      );
      unsubscribeLinksListener = setCollectionListener(
        COLLECTION_LINKS,
        currentUser.uid,
        setLinksToDisplay
      );
    } else {
      setGroups([]);
      setLinksToDisplay([]);
    }
    return () => {
      unsubscribeGroupsListener();
      unsubscribeLinksListener();
    };
  }, [currentUser, link]);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleHideForm = () => setShowForm(false);

  return !!currentUser ? (
    <div className="flex justify-around  relative flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start">
      <div className="w-full lg:w-2/5 xl:w-2/5 lg:p-3 xl:p-3">
        {((showForm && IS_SMALL_SCREEN) || !IS_SMALL_SCREEN) && (
          <LinkForm
            handleHideForm={handleHideForm}
            linkToEdit={link}
            availableGroups={groups}
            currentUser={currentUser}
          />
        )}
      </div>
      {!showForm && (
        <div className="w-full lg:w-3/5 xl:w-3/5 p-3 pb-5 mb-5">
          {IS_SMALL_SCREEN ? (
            <LinkCards
              handleShowForm={handleShowForm}
              handleHideForm={handleHideForm}
              setLink={setLink}
              availableGroups={groups}
              linksToDisplay={linksToDisplay}
            />
          ) : (
            <LinkTable
              setLink={setLink}
              linksToDisplay={linksToDisplay}
              availableGroups={groups}
            />
          )}
        </div>
      )}
      {IS_SMALL_SCREEN && (
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
          {showForm ? (
            <button
              onClick={handleHideForm}
              style={{ width: '40%', fontSize: 13 }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 ml-1 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Links
            </button>
          ) : (
            <>
              <button
                style={{ width: '40%' }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mx-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                {'<'}
              </button>
              <button
                style={{ width: '40%' }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mx-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                {'>'}
              </button>
              <button
                style={{ width: '40%' }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mx-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <span className="fa fa-filter" />
              </button>
              <button
                onClick={handleShowForm}
                style={{ width: '40%', fontSize: 13 }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Add Link
              </button>
            </>
          )}
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default AppContainer;
