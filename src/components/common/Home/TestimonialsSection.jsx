import React from 'react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">"This application has transformed our school management process!"</p>
            <h4 className="text-xl font-bold">- John Doe</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">"User-friendly and efficient, highly recommended."</p>
            <h4 className="text-xl font-bold">- Jane Smith</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">"A must-have for any educational institution."</p>
            <h4 className="text-xl font-bold">- Emily Johnson</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
