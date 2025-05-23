import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getActions } from '../../api/Action/action-api';


export const ActionsTable = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const data = await getActions();
                console.log(data);
                setActions(data);
            } catch (err) {
                console.error('Error fetching actions:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                        <th scope="col" className="px-4 py-2">Action Title</th>
                        <th scope="col" className="px-4 py-2">Action Description</th>
                        <th scope="col" className="px-4 py-2">Start Date </th>
                        <th scope="col" className="px-4 py-2">End Date</th>
                        <th scope="col" className="px-4 py-2">Status </th>
                        <th scope="col" className="px-4 py-2">Priority </th>
                        <th scope="col" className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map((action, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } border-b border-gray-300 hover:bg-gray-200`}
                        >
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${index}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-500 bg-gray-200 border-gray-400 rounded focus:ring-2 focus:ring-blue-400"
                                    />
                                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-4 py-2 font-semibold text-gray-900 whitespace-nowrap"
                            >
                                {action.id}
                            </th>
                            <td className="px-4 py-2">{action.action_title}</td>
                            <td className="px-4 py-2">{action.action_description}</td>
                            <td className="px-4 py-2">{action.action_start_date}</td>
                            <td className="px-4 py-2">{action.action_end_date}</td>
                            <td className="px-4 py-2">{action.action_status}</td>
                            <td className="px-4 py-2">{action.action_priority}</td>
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
    )
};

export default ActionsTable;
