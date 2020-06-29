import React from 'react';
import PropTypes from 'prop-types';

const LinkTable = (props) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-5">
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
          <option>Already read</option>
          <option>In progress</option>
          <option>Not touched</option>
        </select>

        <select
          className="w-1/3 ml-2 shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
          id="grid-state"
        >
          <option>Already read</option>
          <option>In progress</option>
          <option>Not touched</option>
        </select>
      </div>

      <table className="table-auto w-full mb-2">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">
              {' '}
              <input id="link" type="checkbox" />
            </th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Group</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border text-center py-2">
              <span className="fas fa-chevron-down " />{' '}
            </td>
            <td className="border text-center py-2">
              <input id="link" type="checkbox" />
            </td>
            <td className="border px-4 py-2">Intro to CSS</td>
            <td className="border px-4 py-2">Adam</td>
            <td className="border px-4 py-2">Adam</td>
            <td className="border py-2 flex justify-around">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(456);
                }}
                className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
                <span className="fas fa-eye" />{' '}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(456);
                }}
                className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
                <span className="fas fa-link" />{' '}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(456);
                }}
                className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
                <span className="fas fa-pen" />{' '}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(789);
                }}
                className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
                <span className="fas fa-trash-alt " />{' '}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
    </div>
  );
};

LinkTable.propTypes = {};

export default LinkTable;
