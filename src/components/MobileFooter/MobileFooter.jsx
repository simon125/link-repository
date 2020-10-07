import React from 'react';

import PropTypes from 'prop-types';

const style = {
  smallScreenBtnPanel: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    background: '#2d3748',
    width: '100%',
    height: 'fit-content',
  },
  linksButton: { width: '40%', fontSize: 13 },
  addLinkButton: { width: '40%', fontSize: 13 },
  button: { width: '40%' },
};

const MobileFooter = (props) => {
  const { showForm, handleHideForm, handleShowForm } = props;
  return (
    <div style={style.smallScreenBtnPanel} className="flex justify-center p-2">
      {showForm ? (
        <button
          onClick={handleHideForm}
          style={style.linksButton}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 ml-1 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Links
        </button>
      ) : (
        <>
          <button
            onClick={handleShowForm}
            style={style.addLinkButton}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Link
          </button>
        </>
      )}
    </div>
  );
};

MobileFooter.propTypes = {
  showForm: PropTypes.bool.isRequired,
  handleHideForm: PropTypes.func.isRequired,
  handleShowForm: PropTypes.func.isRequired,
};

export default MobileFooter;
