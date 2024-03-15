import React from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function TeacherProfile() {
  return (
    <div className="flex h-screen">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4 text-white">Profile</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="h-44 w-44 rounded-full overflow-hidden bg-white">
            {/* <img
              src="https://play.google.com/store/apps/details?id=com.urappsltd.boysdp&hl=en_US"
              alt="Profile"
              className="h-full w-full object-cover"
            /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-600">
          <div>
            <label htmlFor="name" className="text-white font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label htmlFor="dob" className="text-white font-medium">
              Date of Birth:
            </label>
            <input
              type="text"
              id="dob"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="January 1, 1990"
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-white font-medium">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="Male"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-white font-medium">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="123-456-7890"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-white font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              defaultValue="********"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
