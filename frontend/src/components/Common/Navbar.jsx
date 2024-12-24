import React, { useState, useEffect } from 'react';
import { getUserData } from '../../api/User/user-api';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = getUserData(); // Fetch user data once on mount
        if (data) {
            setUserData(data);
        }
    }, []); // Empty dependency array to run once on mount

    const handleLogout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Profile Icon */}
            <svg
                className="w-8 h-8 text-gray-800 hover:text-gray-600 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
            </svg>

            {/* Hover Box */}
            {isHovered && userData && (
                <div className="absolute top-6 right-0 w-56 z-50 p-4 bg-white border rounded-lg shadow-lg">
                    {/* Full Name */}
                    <p className="text-base font-medium text-gray-800">
                        {userData.first_name + ' ' + userData.last_name}
                    </p>

                    {/* Email */}
                    <p className="text-sm text-gray-600">{userData.email}</p>

                    {/* User Role */}
                    <p className="text-sm text-gray-500 italic">{'Admin'}</p>

                    {/* Logout */}
                    <a
                        onClick={handleLogout}
                        className="mt-3 block text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                    >
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default Navbar;
