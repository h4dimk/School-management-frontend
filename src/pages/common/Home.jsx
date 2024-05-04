import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore and discover what we have to offer!
      </p>
      <div className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 cursor-pointer">
        <a href="">Explore Products</a>
      </div>
    </div>
  );
}

export default Home;
