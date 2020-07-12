import React from 'react';
import PropTypes from 'prop-types';

const LinkTableFilter = ({ availableGroups }) => {
  return (
    <div className="flex my-5 justify-between">
      <input
        className="w-1/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="link"
        type="text"
        placeholder="Search"
      />

      <select
        className="w-1/3 ml-2 shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
        id="grid-state"
      >
        <option>All</option>
        <option>Already read</option>
        <option>In progress</option>
        <option>Not touched</option>
      </select>

      <select
        className="w-1/3 ml-2 shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
        id="grid-state"
      >
        <option selected value="">
          All
        </option>
        {availableGroups.map((group) => (
          <option key={group.id} value={group.value}>
            {group.value}
          </option>
        ))}
      </select>
    </div>
  );
};

LinkTableFilter.propTypes = {};

export default LinkTableFilter;
