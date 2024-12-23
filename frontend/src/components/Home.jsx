import React from 'react';
import Sidebar from './Common/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6 overflow-y-auto ml-48">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
