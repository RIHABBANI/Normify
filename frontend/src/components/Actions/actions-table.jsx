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
    }, []);    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des actions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Actions</h2>
            </div>

            <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-900 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                                <div className="flex items-center justify-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ID</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Titre</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Description</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Date début</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Date fin</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Statut</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Priorité</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions.map((action, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } border-b border-gray-200 hover:bg-blue-50 transition-all duration-150`}
                            >
                                <td className="px-6 py-3">
                                    <div className="flex items-center justify-center">
                                        <input
                                            id={`checkbox-table-search-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-500 bg-gray-200 border-gray-400 rounded focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-3 font-medium">{action.id}</td>
                                <td className="px-6 py-3">{action.action_title}</td>
                                <td className="px-6 py-3">{action.action_description}</td>
                                <td className="px-6 py-3">{action.action_start_date}</td>
                                <td className="px-6 py-3">{action.action_end_date}</td>
                                <td className="px-6 py-3">{action.action_status}</td>
                                <td className="px-6 py-3">{action.action_priority}</td>
                                <td className="px-6 py-3">
                                    <div className="flex space-x-3">
                                        <button className="text-blue-600 hover:text-blue-800" title="Modifier">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button className="text-red-600 hover:text-red-800" title="Supprimer">
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
        </div>
    )
};

export default ActionsTable;
