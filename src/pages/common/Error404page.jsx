import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Error404page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-8 py-12 bg-gray-300 rounded-lg shadow-md">
      <div className="flex flex-col justify-center items-center mb-8">
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x" className="text-red-500 mb-2" />
          <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
        </div>
        <p className="text-lg text-center text-gray-600 mt-4">
          We can't seem to find the page you're looking for.
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="/"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error404page;
