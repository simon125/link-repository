import React from 'react';

import PropTypes from 'prop-types';

const style = { button: { height: 40 } };

const ViewToggler = (props) => {
  const {
    clickCallback,
    buttonState,
    buttonsConfig: { rightIcon, leftTitle, rightTitle, leftIcon },
  } = props;
  return (
    <div className="inline-flex mt-5 mr-4">
      <button
        type="button"
        onClick={() => clickCallback(true)}
        title={leftTitle}
        style={style.button}
        className={`bg-gray-${buttonState ? 400 : 200} hover:bg-gray-${
          buttonState ? 400 : 200
        } text-gray-800 font-bold pt-1 px-4 rounded-r`}
      >
        <span className={`${leftIcon} fa-lg`} />
      </button>
      <button
        type="button"
        onClick={() => clickCallback(false)}
        title={rightTitle}
        style={style.button}
        className={`bg-gray-${buttonState ? 200 : 400} hover:bg-gray-${
          buttonState ? 200 : 400
        } text-gray-800 font-bold pt-1 px-4 rounded-r`}
      >
        <span className={`${rightIcon} fa-lg`} />
      </button>
    </div>
  );
};

ViewToggler.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired,
  buttonsConfig: PropTypes.shape({
    leftIcon: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    leftTitle: PropTypes.string.isRequired,
    rightTitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewToggler;
