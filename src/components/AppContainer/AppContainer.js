import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';

const AppContainer = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  //  !!currentUser ?
  return (
    <div className="flex justify-around mt-5">
      <form
        autoComplete="off"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-8 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Link"
          />
        </div>
        <div className="mb-6">
          <div className="flex">
            {' '}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Group
            </label>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              value=""
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              className="custom-select__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="group"
              type="text"
              placeholder="Select Group"
              autoComplete="off"
              style={{ cursor: 'pointer' }}
            />
            <span
              style={{
                zIndex: 1,
                right: 10,
                top: 10,
                position: 'absolute',
                cursor: 'pointer',
              }}
              class="fas fa-caret-down"
            />
            <div
              style={{
                display: isOpen ? 'block' : 'none',
                position: 'absolute',
                top: 38,
                left: 0,
                width: '100%',
              }}
            >
              <ul
                style={{
                  width: '100%',
                  border: '1px solid #999',
                  borderRadius: 3,
                  backgroundColor: 'white',
                }}
              >
                <li
                  onClick={() => console.log(123)}
                  className="custom-select__option flex justify-between"
                >
                  test1
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(456);
                      }}
                      class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
                    >
                      <span className="fas fa-pen" />{' '}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(789);
                      }}
                      class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
                    >
                      <span className="fas fa-trash-alt " />{' '}
                    </button>
                  </div>
                </li>
                <li className="custom-select__option--input flex">
                  <input
                    className="w-2/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="link"
                    type="text"
                    placeholder="New group"
                  />
                  <button
                    className="w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Cancel
                  </button>
                </li>
                {/* <li className="custom-select__option flex justify-between">
                  test2
                  <div>
                    <button class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-pen" />{' '}
                    </button>
                    <button class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-trash-alt " />{' '}
                    </button>
                  </div>
                </li>
                <li className="custom-select__option flex justify-between">
                  test3
                  <div>
                    <button class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-pen" />{' '}
                    </button>
                    <button class="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-trash-alt " />{' '}
                    </button>
                  </div>
                </li> */}
                <li className="custom-select__option--input flex">
                  <input
                    className="w-2/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="link"
                    type="text"
                    placeholder="New group"
                  />
                  <button
                    className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Add Group
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-5"
            htmlFor="password"
          >
            Status
          </label>

          <select
            className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Already read</option>
            <option>In progress</option>
            <option>Not touched</option>
          </select>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-5"
            htmlFor="password"
          >
            Description
          </label>

          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Link"
          ></textarea>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Link
          </button>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-3 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Cancel
          </button>
        </div>
      </form>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Author</th>
            <th class="px-4 py-2">Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">Intro to CSS</td>
            <td class="border px-4 py-2">Adam</td>
            <td class="border px-4 py-2">
              <button>clickme</button>
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2" colSpan="3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              vel!
            </td>
          </tr>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2">
              A Long and Winding Tour of the History of UI Frameworks and Tools
              and the Impact on Design
            </td>
            <td class="border px-4 py-2">Adam</td>
            <td class="border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Intro to JavaScript</td>
            <td class="border px-4 py-2">Chris</td>
            <td class="border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  //  : (
  //   <Redirect to="/" />
  // );
};

AppContainer.propTypes = {};

export default AppContainer;
