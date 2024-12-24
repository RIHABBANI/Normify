import React from 'react';
import Sidebar from './Common/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './Common/Navbar';

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-48 h-full bg-white shadow-md z-30">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-48">
        {/* Fixed Navbar */}
        <div className="fixed top-0 right-0 h-14 bg-white shadow flex items-center justify-end px-6 z-20 ml-48" style={{ width: 'calc(100% - 12rem)' }}>
          <Navbar />
        </div>

        {/* Main Content with proper spacing and scrolling */}
        <div className="flex-grow bg-gray-100 mt-14 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;