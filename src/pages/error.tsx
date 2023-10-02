import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { handleBackToLogin } from '../hooks/courses/useError';

export function Error() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-red-500 mb-4">Error!</h1>
        <p className="text-gray-700">Sorry, something went wrong. Please try again later.</p>
        <button
          onClick={handleBackToLogin}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none flex items-center justify-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
        </button>
      </div>
    </div>
  );
}
