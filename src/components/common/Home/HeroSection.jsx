import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="bg-gray-800 h-screen flex items-center justify-center text-gray-300">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our School Management System</h1>
        <p className="text-xl mb-8">Efficient, Reliable, and User-Friendly.</p>
        <a href="#features" className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold">Learn More</a>
      </div>
    </section>
  );
};

export default HeroSection;
