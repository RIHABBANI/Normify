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
                    <Link to="/dashboard" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">Normify</span>
                    </Link>
                </div>                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {/* Dashboard */}
                        <li>
                            <Link 
                                to="/" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                                <span className="ms-3 text-sm">Tableau de bord</span>
                            </Link>  
                        </li>

                        {/* Infrastructure Section */}
                        <li className="pt-4">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">Infrastructure</div>
                        </li>
                        <li>
                            <Link 
                                to="/rames" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v11.25a1.5 1.5 0 0 1-1.5 1.5h-1.5Zm5.25 0a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v11.25a1.5 1.5 0 0 1-1.5 1.5h-1.5Z" />
                                </svg>
                                <span className="ms-3 text-sm">Rames</span>
                            </Link>  
                        </li>
                        <li>
                            <Link 
                                to="/racks" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span className="ms-3 text-sm">Racks</span>
                            </Link>  
                        </li>
                        <li>
                            <Link 
                                to="/cartes" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <span className="ms-3 text-sm">Cartes</span>
                            </Link>  
                        </li>

                        {/* Operations Section */}
                        <li className="pt-4">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">Opérations</div>
                        </li>
                        <li>
                            <Link 
                                to="/maintenances" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>
                                <span className="ms-3 text-sm">Maintenances</span>
                            </Link>  
                        </li>
                        <li>
                            <Link 
                                to="/interventions" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                <span className="ms-3 text-sm">Interventions</span>
                            </Link>  
                        </li>

                        {/* Administration Section */}
                        <li className="pt-4">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">Administration</div>
                        </li>
                        <li>
                            <Link 
                                to="/users" 
                                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                <span className="ms-3 text-sm">Utilisateurs</span>
                            </Link> 
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;