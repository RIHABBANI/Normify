import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isNormsDropdownOpen, setIsNormsDropdownOpen] = useState(false);

    const toggleNormsDropdown = () => {
        setIsNormsDropdownOpen(!isNormsDropdownOpen);
    };

    return (
        <>
            <aside className="fixed top-0 left-0 z-40 w-48 h-screen border transition-transform -translate-x-full sm:translate-x-0 bg-white" aria-label="Sidebar">
                <div className="flex items-center justify-center py-4">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Normify</span>
                    </Link>
                </div>

                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link 
                                to="/" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>
                                <span className="ms-3 text-sm">Dashboard</span>
                            </Link>  
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-800 transition duration-75 rounded-lg group hover:bg-gray-200"
                                onClick={toggleNormsDropdown}
                            >
                                 <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm">Norms</span>
                                <svg className={`w-3 h-3 transition-transform duration-200 ${isNormsDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isNormsDropdownOpen && (
                                <ul className="py-2 space-y-2">
                                    <li>
                                        <Link 
                                            to="/norms" 
                                            className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-8 group hover:bg-gray-200 text-sm"
                                        >
                                            General
                                        </Link>                                    
                                    </li>
                                    <li>
                                        <Link 
                                            to="/norms-chapters" 
                                            className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-8 group hover:bg-gray-200 text-sm"
                                        >
                                            Chapters
                                        </Link>                                    
                                    </li>
                                    <li>
                                        <Link 
                                            to="/norms-sub-chapters" 
                                            className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-8 group hover:bg-gray-200 text-sm"
                                        >
                                            Sub Chapters
                                        </Link>   
                                    </li>
                                    <li>
                                        <Link 
                                            to="/norms-exigencies" 
                                            className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-8 group hover:bg-gray-200 text-sm"
                                        >
                                            Exigencies
                                        </Link>   
                                    </li>
                                </ul>
                            )}
                        </li>
                        {/* Rest of the sidebar items remain unchanged */}
                        <li>
                            <Link 
                                to="/diagnostics" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                 <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                                <span className="ms-3 text-sm">Diagnostic</span>
                            </Link> 
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>
                                <span className="ms-3 text-sm">Actions</span>
                            </a>
                        </li>
                        <li>
                            <Link 
                                to="/users" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                <span className="ms-3 text-sm">Users</span>
                            </Link> 
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;