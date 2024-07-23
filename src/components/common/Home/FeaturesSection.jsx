import React from 'react';

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Attendance Management</h3>
            <p>Automate attendance tracking and ensure accuracy.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Gradebook</h3>
            <p>Manage and track student grades efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Communication Tools</h3>
            <p>Facilitate seamless communication between students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
