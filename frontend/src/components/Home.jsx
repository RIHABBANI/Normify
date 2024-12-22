import React from 'react'
import Sidebar from './Common/Sidebar';
import '../index.css';

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p>Welcome to the admin panel</p>
      </div>
    </div>
  )
}

export default Home