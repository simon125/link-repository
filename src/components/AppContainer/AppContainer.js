import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './AppContainer.css';

const AppContainer = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  //  !!currentUser ?
  return (
    <div className="flex justify-around pt-5 relative">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          zIndex: 10,
          background: 'rgba(100,100,100,0.8)',
          overflowY: 'hidden',
        }}
      >
        <div
          className="w-9/10 rounded overflow-hidden shadow-lg bg-white absolute"
          style={{
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Title</div>
            <p className="text-gray-700 text-base">Description</p>
            <div>
              <div
                class="relative bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert"
              >
                <p class="font-bold">Informational message</p>
                <p class="text-sm">
                  Some additional text to explain said message.
                </p>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    class="fill-current h-6 w-6 text-blue-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
              <iframe
                onLoad={(e) => {
                  // debugger;
                  // if not marked hide and don't display in the future
                }}
                title="https://dev.to/rishabk7/my-blog-5386"
                src="https://dev.to/rishabk7/my-blog-5386"
                width={window.innerWidth * 0.8 + 'px'}
                height={window.innerHeight * 0.5 + 'px'}
                display="initial"
                position="relative"
              ></iframe>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between">
            <div>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #group
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #status
              </span>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <form
        autoComplete="off"
        className="bg-white shadow-md rounded px-8 pb-8 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
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
              className="fas fa-caret-down"
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
                  </div>
                </li>
                <li className="custom-select__option--input flex">
                  <input
                    style={{ width: '60%' }}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="link"
                    type="text"
                    placeholder="New group"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Cancel
                  </button>
                </li>
                {/* <li className="custom-select__option flex justify-between">
                  test2
                  <div>
                    <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-pen" />{' '}
                    </button>
                    <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-trash-alt " />{' '}
                    </button>
                  </div>
                </li>
                <li className="custom-select__option flex justify-between">
                  test3
                  <div>
                    <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-pen" />{' '}
                    </button>
                    <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded">
                      <span className="fas fa-trash-alt " />{' '}
                    </button>
                  </div>
                </li> */}
                <li className="custom-select__option--input flex">
                  <input
                    style={{ width: '60%' }}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="link"
                    type="text"
                    placeholder="New group"
                  />
                  <button
                    style={{ width: '40%' }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
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
            htmlFor="link"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Title"
          />
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

      <div style={{ width: '60vw' }}>
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
            {/* <div className="ml-2 w-1/3" style={{ position: 'relative' }}>
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
                className="fas fa-caret-down"
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
                    </div>
                  </li>
                  <li className="custom-select__option--input flex">
                    <input
                      style={{ width: '60%' }}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="link"
                      type="text"
                      placeholder="New group"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Save
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Cancel
                    </button>
                  </li>
               
                  <li className="custom-select__option--input flex">
                    <input
                      style={{ width: '60%' }}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="link"
                      type="text"
                      placeholder="New group"
                    />
                    <button
                      style={{ width: '40%' }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Add Group
                    </button>
                  </li>
                </ul>
              </div>
            </div> */}
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
              {/* <tr>
              <td className="border px-4 py-2" colSpan="3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi, vel!
              </td>
            </tr> */}
              {/* <tr className="bg-gray-100">
              <td className="border px-4 py-2">
              <input id="link" type="checkbox" />
              </td>
              <td className="border px-4 py-2">A Long and Winding Tour</td>
              <td className="border px-4 py-2">Adam</td>
              <td className="border px-4 py-2">112</td>
              <td>
              <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                console.log(456);
              }}
              className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
              <span className="fas fa-chevron-down" />{' '}
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
            </tr> */}
              {/* <tr>
              <td className="border px-4 py-2">
              <input id="link" type="checkbox" />
              </td>
              <td className="border px-4 py-2">Intro to JavaScript</td>
              <td className="border px-4 py-2">Chris</td>
              <td className="border px-4 py-2">1,280</td>
              <td>
              <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                console.log(456);
              }}
              className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
              >
              <span className="fas fa-chevron-down" />{' '}
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
            </tr> */}
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
      </div>
    </div>
  );
  //  : (
  //   <Redirect to="/" />
  // );
};

AppContainer.propTypes = {};

export default AppContainer;
