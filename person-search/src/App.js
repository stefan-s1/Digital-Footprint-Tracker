// src/App.js
import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import MainContent from './components/MainContent';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import RemovalToolsPage from './components/RemovalToolsPage';
import HeroSection from './components/HeroSection';
import PurposeStatement from './components/PurposeStatement';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

function App() {
  const [socket, setSocket] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [showTerms, setShowTerms] = useState(false); // Default to closed
  const [showPolicy, setShowPolicy] = useState(false);
  const [searchName, setSearchName] = useState('');

  const location = useLocation();

  // Initialize Socket.IO client
  useEffect(() => {
    const newSocket = io({
      pingTimeout: 300000, // 5 minutes
      pingInterval: 25000, // 25 seconds
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Handle progress updates from the server
    newSocket.on('progress', (data) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        { timestamp: new Date().toLocaleTimeString(), message: data.message },
      ]);
    });

    // Handle final results from the server
    newSocket.on('results', (data) => {
      console.log('Received results:', data);
      setSummaries(data);
      setIsSearching(false);
    });

    // Handle errors from the server
    newSocket.on('error', (data) => {
      console.log('Received error:', data);
      setLogs((prevLogs) => [
        ...prevLogs,
        { timestamp: new Date().toLocaleTimeString(), message: data.message },
      ]);
      setIsSearching(false);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to handle search submission
  const handleSearch = (name, optionalInfo) => {
    setIsSearching(true);
    setSummaries([]);
    setLogs([]);
    setSearchName(name);

    if (socket && socket.connected) {
      // Emit the 'start_search' event to the server
      socket.emit('start_search', { name, optional_info: optionalInfo });
    } else {
      // Handle the case where the socket is not connected
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          timestamp: new Date().toLocaleTimeString(),
          message: 'Socket connection not established.',
        },
      ]);
      setIsSearching(false);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Functions to open and close modals
  const openTerms = () => {
    setShowTerms(true);
  };

  const closeTerms = () => {
    setShowTerms(false);
  };

  const openPolicy = () => {
    setShowPolicy(true);
  };

  const closePolicy = () => {
    setShowPolicy(false);
  };

  // Apply dark mode class to the document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-3xl font-bold">
            <Link to="/">Digital Footprint Tracker</Link>
          </h1>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-blue-500 hover:underline flex items-center">
              <FaHome className="w-5 h-5 mr-1" />
              Home
            </Link>
            <Link to="/purpose" className="text-blue-500 hover:underline">
              Purpose Statement
            </Link>
            <Link to="/removal-tools" className="text-blue-500 hover:underline">
              Removal Tools
            </Link>
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </header>

        {/* Content */}
        <div className="flex-grow relative">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <HeroSection />
                  </PageTransition>
                }
              />
              <Route
                path="/app"
                element={
                  <PageTransition>
                    <MainContent
                      handleSearch={handleSearch}
                      isSearching={isSearching}
                      logs={logs}
                      summaries={summaries}
                      searchName={searchName}
                    />
                  </PageTransition>
                }
              />
              <Route
                path="/purpose"
                element={
                  <PageTransition>
                    <PurposeStatement />
                  </PageTransition>
                }
              />
              <Route
                path="/removal-tools"
                element={
                  <PageTransition>
                    <RemovalToolsPage />
                  </PageTransition>
                }
              />
              {/* Add more routes as needed */}
            </Routes>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Footer openTerms={openTerms} openPolicy={openPolicy} />

        {/* Modals */}
        {showTerms && (
          <TermsAndConditions
            closeTerms={closeTerms}
            openPrivacyPolicy={() => {
              closeTerms();
              openPolicy();
            }}
          />
        )}
        {showPolicy && <PrivacyPolicy closePrivacyPolicy={closePolicy} />}
      </div>
    </div>
  );
}

export default App;
