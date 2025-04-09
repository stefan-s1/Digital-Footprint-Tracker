import React, { useState } from 'react';
import DOMPurify from 'dompurify';

function SearchForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [optionalInfo, setOptionalInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sanitize inputs
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedOptionalInfo = DOMPurify.sanitize(optionalInfo);
    onSubmit(sanitizedName, sanitizedOptionalInfo.split(',').map((info) => info.trim()));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Search for Your Digital Footprint
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Optional Information:</label>
        <input
          type="text"
          value={optionalInfo}
          onChange={(e) => setOptionalInfo(e.target.value)}
          placeholder="Enter additional info, separated by commas"
          className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;