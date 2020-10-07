/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import './AppContainer.css';
import LinkForm from '../../components/LinkForm/LinkForm';
import MobileFooter from '../../components/MobileFooter/MobileFooter';
import MobileLinksCards from '../../components/MobileLinksCards/MobileLinksCards';
import Links from './Links';

const AppContainer = ({ currentUser, linksToDisplay, groups, showSpinner }) => {
  const [linkToEdit, setLinkToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);

  const IS_SMALL_SCREEN = window.innerWidth < 650;

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleHideForm = () => setShowForm(false);

  return currentUser ? (
    <div className="flex justify-around  relative flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start">
      <div className="w-full lg:w-2/5 xl:w-2/5 lg:p-3 xl:p-3">
        {((showForm && IS_SMALL_SCREEN) || !IS_SMALL_SCREEN) && ( // todo: consider if this couldn't be easier
          <LinkForm
            handleHideForm={handleHideForm}
            linkToEdit={linkToEdit}
            availableGroups={groups}
            currentUser={currentUser}
          />
        )}
      </div>
      {!showForm && (
        <div className="w-full lg:w-3/5 xl:w-3/5 p-3 pb-5 mb-5">
          {IS_SMALL_SCREEN ? (
            <MobileLinksCards
              handleShowForm={handleShowForm}
              handleHideForm={handleHideForm}
              setLink={setLinkToEdit}
              availableGroups={groups}
              linksToDisplay={linksToDisplay}
            />
          ) : (
            <Links
              showSpinner={showSpinner}
              setLinkToEdit={setLinkToEdit}
              linksToDisplay={linksToDisplay}
              availableGroups={groups}
            />
          )}
        </div>
      )}
      {IS_SMALL_SCREEN && (
        <MobileFooter
          showForm={showForm}
          handleHideForm={handleHideForm}
          handleShowForm={handleShowForm}
        />
      )}
    </div>
  ) : (
    // <Redirect to="/" />
    <h1>LOADING...</h1>
  );
};

AppContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentUser: PropTypes.object,
  linksToDisplay: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  showSpinner: PropTypes.bool.isRequired,
};

AppContainer.defaultProps = {
  currentUser: null,
  linksToDisplay: [],
  groups: [],
};

export default AppContainer;
