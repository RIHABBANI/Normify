import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getUser } from '../../api/User/user-api';


export const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUser();
                console.log(data);
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Show a loading indicator while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render the table
    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border border-gray-300">
            <table className="w-full text-xs text-left text-gray-900 bg-white">
                <thead className="text-xs uppercase text-gray bg-white-700">
                    <tr>
                        <th scope="col" className="p-3 border-gray-300">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-4 py-2">id</th>
                        <th scope="col" className="px-4 py-2">First Name</th>
                        <th scope="col" className="px-4 py-2">Last Name</th>
                        <th scope="col" className="px-4 py-2">Phone</th>
                        <th scope="col" className="px-4 py-2">Matriculation</th>
                        <th scope="col" className="px-4 py-2">Email</th>
                        <th scope="col" className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            } text-sm`}
                        >
                            <td className="p-3 border-gray-300">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-${user.id}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                    />
                                    <label htmlFor={`checkbox-${user.id}`} className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.first_name}</td>
                            <td className="px-4 py-2">{user.last_name}</td>
                            <td className="px-4 py-2">{user.phone}</td>
                            <td className="px-4 py-2">{user.matriculation}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">
                                <div className="flex space-x-2">
                                    <button className="text-gray-500 hover:text-blue-600">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-500 hover:text-red-600">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;