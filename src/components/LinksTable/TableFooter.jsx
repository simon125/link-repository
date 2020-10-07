import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const LinkTableFooter = ({ pageNumber, setPageNumber, itemsAmount, itemsPerPage }) => {
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNumber < itemsAmount / itemsPerPage) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    if (maxPageNumber < pageNumber) {
      setPageNumber(pageNumber - 1);
    }
    const newMaxPageNumber = Math.ceil(itemsAmount / itemsPerPage);
    if (newMaxPageNumber) {
      setMaxPageNumber(newMaxPageNumber);
    }
  }, [maxPageNumber, itemsAmount, itemsPerPage]);

  return (
    <tfoot>
      {maxPageNumber > 1 && (
        <tr>
          <th style={{ paddingTop: 10 }} colSpan="5">
            <button
              onClick={handlePreviousClick}
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              style={{ padding: 7, margin: 3 }}
            >
              Prev
            </button>
            <span
              className="bg-transparent text-blue-700 font-semibold px-1 border border-blue-500 rounded"
              style={{ padding: 10, margin: 3 }}
            >
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              {pageNumber} of {maxPageNumber}
            </span>
            <button
              onClick={handleNextClick}
              type="button"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              style={{ padding: 7, margin: 3 }}
            >
              Next
            </button>
          </th>
        </tr>
      )}
    </tfoot>
  );
};

LinkTableFooter.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  itemsAmount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default LinkTableFooter;
