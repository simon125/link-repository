import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logOut } from '../../firebase/firebaseAuth';

const Navigation = ({ currentUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleHamburgerClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClick = () => setIsNavOpen(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={handleHamburgerClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className={isNavOpen ? 'hidden h-6 w-6' : 'block h-6 w-6'}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={isNavOpen ? 'block h-6 w-6' : 'hidden h-6 w-6'}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center content-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-gray-100 text-center text-xl">
                {' '}
                <span
                  className="fas fa-link fa-lg"
                  style={{ color: '#61DBFB' }}
                />{' '}
                Link repository
              </h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <Link
                  onClick={handleClick}
                  to="/"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Home
                </Link>
                {currentUser && (
                  <Link
                    onClick={handleClick}
                    to="/app"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    App
                  </Link>
                )}
                <Link
                  onClick={handleClick}
                  to="/about"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div>
            {currentUser && (
              <button
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                onClick={logOut}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          left: 0,
          top: 64,
          zIndex: 1,
        }}
        className={isNavOpen ? 'bg-gray-800' : 'hidden sm:hidden'}
      >
        <div className="px-2 pt-2 pb-3">
          <Link
            onClick={handleClick}
            to="/"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Home
          </Link>
          {currentUser && (
            <Link
              onClick={handleClick}
              to="/app"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              App
            </Link>
          )}
          <Link
            onClick={handleClick}
            to="/about"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {};

export default Navigation;
