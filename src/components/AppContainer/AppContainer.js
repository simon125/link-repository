import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';
import LinkForm from '../LinkForm/LinkForm';
import LinkTable from '../LinkTable/LinkTable';

const AppContainer = ({ currentUser }) => {
  //  !!currentUser ?
  return (
    <div className="flex justify-around pt-5 relative">
      {/* <div> */}
      <LinkForm currentUser={currentUser} />
      {/* </div> */}
      <div style={{ width: '60vw' }}>
        <LinkTable />
      </div>
    </div>
  );
  //  : (
  //   <Redirect to="/" />
  // );
};

AppContainer.propTypes = {};

export default AppContainer;
