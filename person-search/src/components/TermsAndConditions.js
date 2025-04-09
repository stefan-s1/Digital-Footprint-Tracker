import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function TermsAndConditions({ closeTerms, openPrivacyPolicy }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  // Don't close modal on 'Escape' key press, keep this hear in case we decide to change this behavior later
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Do nothing, users must accept
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeTerms]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
      ></div>

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Modal Content */}
        <div
          className="relative w-full max-w-3xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 4rem)' }}
        >

          {/* Modal Content */}
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <p className="mb-4">Last Updated: 31st October 2024</p>

          {/* Content */}
          <h3 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h3>
          <p className="mt-2">
            By accessing or using the Digital Footprint Tracker ("App"), you
            agree to be bound by these Terms and Conditions ("Terms"). If you do
            not agree to these Terms, please do not use our App.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. Description of Service</h3>
          <p className="mt-2">
            The Digital Footprint Tracker is designed to demonstrate how much
            publicly available information can be found about an individual on
            the internet. Users input a name and optional information to receive
            aggregated public data.
          </p>

            <h3 className="text-xl font-semibold mt-6">3. Responsible Use</h3>

            <h4 className="text-lg font-semibold mt-4">3.1. Prohibited Activities</h4>
            <p className="mt-2">You agree not to use the App for:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>Stalking, harassing, or harming any individual.</li>
            <li>Any unlawful or unethical activities.</li>
            <li>Collecting or storing personal data about others without their consent.</li>
            <li>Circumventing or attempting to circumvent any security measures of the App.</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">3.2. User Obligations</h4>
            <p className="mt-2">You agree to:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li>Provide accurate and lawful input data.</li>
            <li>Use the App in compliance with all applicable laws and regulations.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">4. Intellectual Property Rights</h3>
            <p className="mt-2">
            All content, features, and functionality of the App, including but not limited to text, graphics, logos, and software, are the exclusive property of Stefan Sarmo and are protected by intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mt-6">5. Limitation of Liability</h3>
            <p className="mt-2">
            In no event shall Stefan Sarmo be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the App.
            </p>

            <h3 className="text-xl font-semibold mt-6">6. Disclaimers</h3>
            <p className="mt-2">
            The App is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information provided.
            </p>

            <h3 className="text-xl font-semibold mt-6">7. Governing Law</h3>
            <p className="mt-2">
            These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, under the jurisdiction of England, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mt-6">8. Modifications to the Terms</h3>
            <p className="mt-2">
            We reserve the right to modify or replace these Terms at any time. Changes will be effective upon posting to this page with an updated "Last Updated" date. Your continued use of the App after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h3 className="text-xl font-semibold mt-6">9. Termination</h3>
            <p className="mt-2">
            We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including but not limited to a breach of these Terms.
            </p>

            <h3 className="text-xl font-semibold mt-6">10. Contact Information</h3>
            <p className="mt-2">
            For any questions about these Terms, please contact me at:
            <br />
            Email: <a href="mailto:stefansarmo@homtail.com" className="text-blue-500 underline">stefansarmo@homtail.com</a>
            </p>

            <h3 className="text-xl font-semibold mt-6">11. Entire Agreement</h3>
            <p className="mt-2">
            These Terms constitute the entire agreement between you and Stefan Sarmo regarding the use of the App.
            </p>

            <h3 className="text-xl font-semibold mt-6">12. Privacy Policy</h3>
          <p className="mt-2">
            Your privacy is important. Please refer to the{' '}
            <button
              onClick={() => {
                closeTerms();
                openPrivacyPolicy();
              }}
              className="underline text-blue-500 focus:outline-none"
            >
              Privacy Policy
            </button>{' '}
            for information on how we collect, use, and protect your personal
            data.
          </p>

          {/* Accept Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={closeTerms}
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default TermsAndConditions;
