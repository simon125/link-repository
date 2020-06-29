import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
    </>
  );
};

CustomSelect.propTypes = {};

export default CustomSelect;
