import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getActions } from '../../api/Action/action-api';

export const ActionsTable = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = async () => {
        try {
            setLoading(true);
            const data = await getActions();
            setActions(data);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des actions:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination calculations
    const totalItems = actions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = actions.slice(startIndex, endIndex);

    // Pagination functions
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    // Show a loading indicator while fetching data
    if (loading && actions.length === 0) {
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Actions</h2>
                <div className="flex space-x-2">
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => {/* Add action handler */}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Ajouter une action
                    </button>
                    <div className="flex bg-gray-200 rounded-md p-1">
                        <button
                            className={`px-3 py-1 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('table')}
                            aria-label="Vue tableau"
                            title="Vue tableau"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${viewMode === 'cards' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('cards')}
                            aria-label="Vue carte"
                            title="Vue carte"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Success message */}
            {success && (
                <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">{success}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {actions.length === 0 ? (
                <div className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">Aucune action trouvée</h3>
                    <p className="text-yellow-600">Aucune action n'a été trouvée dans la base de données.</p>
                </div>
            ) : viewMode === 'table' ? (
                <>
                    {/* Results info */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">
                            Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} actions
                        </p>
                    </div>

                    <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-900 bg-white">
                            <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                                <tr>
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
                                {currentItems.map((action, index) => (
                                    <tr
                                        key={action.id || index}
                                        className={`${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } border-b border-gray-200 hover:bg-blue-50 transition-all duration-150`}
                                    >
                                        <td className="px-6 py-3 font-medium">{action.id}</td>
                                        <td className="px-6 py-3">{action.action_title}</td>
                                        <td className="px-6 py-3">{action.action_description}</td>
                                        <td className="px-6 py-3">{action.action_start_date}</td>
                                        <td className="px-6 py-3">{action.action_end_date}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                action.action_status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                action.action_status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {action.action_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                action.action_priority === 'high' ? 'bg-red-100 text-red-800' : 
                                                action.action_priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {action.action_priority}
                                            </span>
                                        </td>
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goToPrevious}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Précédent
                                </button>
                                
                                <div className="flex space-x-1">
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={goToNext}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                // Cards view
                <>
                    {/* Results info */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">
                            Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} actions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((action, index) => (
                            <div key={action.id || index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{action.action_title}</h3>
                                        <div className="flex space-x-2 mt-2">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                action.action_status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                action.action_status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {action.action_status}
                                            </span>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                action.action_priority === 'high' ? 'bg-red-100 text-red-800' : 
                                                action.action_priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {action.action_priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
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
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium">ID:</span> {action.id}</p>
                                    <p><span className="font-medium">Description:</span> {action.action_description}</p>
                                    <p><span className="font-medium">Date début:</span> {action.action_start_date}</p>
                                    <p><span className="font-medium">Date fin:</span> {action.action_end_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goToPrevious}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Précédent
                                </button>
                                
                                <div className="flex space-x-1">
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={goToNext}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}
                </>            )}
        </div>
    );
};

export default ActionsTable;
