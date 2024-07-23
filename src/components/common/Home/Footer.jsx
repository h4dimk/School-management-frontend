import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 School Management System. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="mx-2 text-gray-400 hover:text-white">Facebook</a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
