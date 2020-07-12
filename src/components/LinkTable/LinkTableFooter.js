import React from 'react';
import PropTypes from 'prop-types';

const LinkTableFooter = (props) => {
  return (
    <div className="flex justify-center">
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-3">
        Delete all
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        Prev
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next
      </button>
    </div>
  );
};

LinkTableFooter.propTypes = {};

export default LinkTableFooter;
