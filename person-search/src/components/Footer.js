// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ openTerms, openPolicy }) {
  return (
    <footer className="p-4 bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-2">
      <p className="text-sm">
              Worried about what you see? Check out these{' '}
              <Link to="/removal-tools" className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                Removal Tools
              </Link>
              {' '}to manage your online presence.
            </p>
        <p className="text-center text-sm">
          By using this tool, you agree to the{' '}
          <button onClick={openTerms} className="underline focus:outline-none">
            Terms and Conditions
          </button>
          .
        </p>
        <p className="text-center text-sm">
          For information about the handling of data, please see the{' '}
          <button onClick={openPolicy} className="underline focus:outline-none">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
