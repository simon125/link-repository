import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const AppContainer = ({ currentUser }) => {
  return !!currentUser ? (
    <>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Link"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Group
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
          >
            <option value="">test 1</option>
            <option value="">test 2</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Link
          </button>
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-3 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Cancel
          </button>
        </div>
      </form>
    </>
  ) : (
    <Redirect to="/" />
  );
};

AppContainer.propTypes = {};

export default AppContainer;
