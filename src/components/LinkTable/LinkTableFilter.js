import React from 'react';
import PropTypes from 'prop-types';

const LinkTableFilter = ({ availableGroups, filters, setFilters }) => {
  return (
    <div className="flex my-5 justify-between">
      <div className="w-1/3">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="link"
        >
          Title
        </label>
        <input
          className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="link"
          type="text"
          placeholder="Search"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
      </div>

      <div className="w-1/4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="link"
        >
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className=" ml-2 shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
          id="grid-state"
        >
          <option>All</option>
          <option>Already read</option>
          <option>In progress</option>
          <option>Not touched</option>
        </select>
      </div>
      <div className="w-1/4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="link"
        >
          Group
        </label>
        <select
          value={filters.group}
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
          className="ml-2 shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
          id="grid-state"
        >
          <option value="All">All</option>
          {availableGroups.map((group) => (
            <option key={group.id} value={group.value}>
              {group.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

LinkTableFilter.propTypes = {};

export default LinkTableFilter;
