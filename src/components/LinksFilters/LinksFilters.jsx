import React from 'react';

import PropTypes from 'prop-types';

const AVAILABLE_STATUSES = ['All', 'Already read', 'In progress', 'Not touched']; // TODO: move to constant

const LinksFilters = ({ availableGroups, filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '30%' }}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
          Title
          <input
            className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="link"
            type="text"
            placeholder="Search"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </label>
      </div>

      <div style={{ width: '30%' }}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status
          <select
            name="status"
            onChange={handleFilterChange}
            className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="status"
          >
            {AVAILABLE_STATUSES.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ width: '30%' }}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="group">
          Group
          <select
            name="group"
            onChange={handleFilterChange}
            className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="group"
          >
            <option value="All">All</option>
            {availableGroups.map((group) => (
              <option key={group.id} value={group.value}>
                {group.value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

LinksFilters.propTypes = {
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.shape({
    title: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

LinksFilters.defaultProps = {
  availableGroups: [],
};

export default LinksFilters;
