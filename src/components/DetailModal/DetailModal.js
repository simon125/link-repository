import React from 'react';
import PropTypes from 'prop-types';

const DetailModal = (props) => {
  return (
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
          <div className="font-bold text-xl mb-2">
            Title{' '}
            <div>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #group
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #status
              </span>
            </div>
          </div>
          <p className="text-gray-700 text-base mb-3">Description</p>
          <div>
            <div
              class="relative bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 my-3"
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
        <div className="px-6 py-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

DetailModal.propTypes = {};

export default DetailModal;
