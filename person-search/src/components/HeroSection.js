import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="relative z-50">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-screen object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 h-screen bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex items-center justify-center h-screen">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Digital Footprint
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Uncover what's out there about you on the internet.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
