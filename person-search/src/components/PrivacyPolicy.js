import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function PrivacyPolicy({ closePrivacyPolicy }) {
  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePrivacyPolicy();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePrivacyPolicy]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closePrivacyPolicy}
      ></div>

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Modal Content */}
        <div
          className="relative w-full max-w-3xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 4rem)' }}
        >
          {/* Close Button at the Top Right */}
          <button
            onClick={closePrivacyPolicy}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586L15.657 2.93a1 1 0 111.415 1.414L11.414 10l5.657 5.657a1 1 0 01-1.415 1.415L10 11.414l-5.657 5.657a1 1 0 01-1.415-1.415L8.586 10 2.93 4.343a1 1 0 011.415-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Modal Content */}
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">Last Updated: 31st October 2024</p>

          {/* --- Your Privacy Policy Content --- */}

          <h3 className="text-xl font-semibold mt-6">1. Introduction</h3>
          <p className="mt-2">
            Welcome to the Digital Footprint Tracker ("we," "us," or "our"). We
            are committed to protecting your personal data and respecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our application ("App").
          </p>

            <h3 className="text-xl font-semibold mt-6">2. Data Controller</h3>
            <p className="mt-2">The data controller responsible for your personal data is:</p>
            <p className="mt-2">
            Name: Stefan Sarmo
            <br />
            Email: <a href="mailto:stefansarmo@hotmail.com" className="text-blue-500 underline">stefansarmo@hotmail.com</a>
            </p>

            <h3 className="text-xl font-semibold mt-6">3. Data We Collect</h3>

            <h4 className="text-lg font-semibold mt-4">a. Personal Data Provided by You</h4>
            <p className="mt-2">
            <strong>Name Input:</strong> When you use our App to search for information, you may input names or other optional information. This data is used solely to perform the search as requested by you.
            </p>

            <h4 className="text-lg font-semibold mt-4">b. Automatically Collected Data</h4>
            <p className="mt-2">
            <strong>IP Address:</strong> We collect your IP address for rate-limiting purposes to prevent misuse of our App.
            </p>

            <h3 className="text-xl font-semibold mt-6">4. Purpose of Data Processing</h3>
            <p className="mt-2">We process your personal data for the following purposes:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>To perform searches based on the information you input.</li>
            <li>To implement rate limiting and protect against unauthorized or abusive use of our App.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">5. Legal Basis for Processing</h3>
            <p className="mt-2">Our legal basis for processing your personal data includes:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>
                <strong>Consent:</strong> By using our App and inputting data, you consent to our processing of your personal data for the purposes outlined.
            </li>
            <li>
                <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests in providing and improving our services, provided these do not override your rights and freedoms.
            </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">6. Data Sharing and Disclosure</h3>
            <p className="mt-2">We do not sell, rent, or share your personal data with third parties, except:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>Legal Obligations: If required by law or to protect our rights.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">7. Data Retention</h3>
            <p className="mt-2">
            <strong>Transient Data:</strong> We do not store the personal data you input (names or optional information) on our servers. All searches are processed in real-time and are stateless.
            </p>
            <p className="mt-2">
            <strong>IP Addresses:</strong> Retained for up to 30 days solely for security and rate-limiting purposes.
            </p>

            <h3 className="text-xl font-semibold mt-6">8. Your Rights</h3>
            <p className="mt-2">Under the GDPR, you have the following rights:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>Access: Request access to your personal data.</li>
            <li>Rectification: Request correction of any inaccurate data.</li>
            <li>Erasure: Request deletion of your personal data.</li>
            <li>Restriction: Request restriction of processing.</li>
            <li>Objection: Object to processing based on legitimate interests.</li>
            <li>Data Portability: Request transfer of your data to you or a third party.</li>
            </ul>
            <p className="mt-2">
            To exercise any of these rights, please contact me at{' '}
            <a href="mailto:stefansarmo@hotmail.com" className="text-blue-500 underline">stefansarmo@hotmail.com</a>.
            </p>

            <h3 className="text-xl font-semibold mt-6">9. Data Security</h3>
            <p className="mt-2">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-xl font-semibold mt-6">10. International Data Transfers</h3>
            <p className="mt-2">
            Your personal data is processed within the United Kingdom. We do not transfer your data outside the European Economic Area (EEA).
            </p>

            <h3 className="text-xl font-semibold mt-6">11. Cookies and Similar Technologies</h3>
            <p className="mt-2">
            We do not use cookies or similar tracking technologies in our App.
            </p>

            <h3 className="text-xl font-semibold mt-6">12. Changes to This Privacy Policy</h3>
            <p className="mt-2">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
            </p>

            <h3 className="text-xl font-semibold mt-6">13. Contact Us</h3>
            <p className="mt-2">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact me at:
            </p>
            <p className="mt-2">
            Email: <a href="mailto:stefansarmo@hotmail.com" className="text-blue-500 underline">stefansarmo@hotmail.com</a>
            </p>

          {/* Close button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={closePrivacyPolicy}
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default PrivacyPolicy;
