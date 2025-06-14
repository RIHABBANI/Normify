import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { getInterventions, createIntervention, updateIntervention, deleteIntervention } from '../../api/Intervention/intervention-api';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';

export const InterventionsTable = () => {
    const navigate = useNavigate();
    const [interventions, setInterventions] = useState([]);    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table');
    
    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Form data
    const [formData, setFormData] = useState({
        DATE_INTERVENTION: '',
        MOTIF: '',
        TRAVAUX: ''
    });
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {        try {
            setLoading(true);
            const interventionsData = await getInterventions();
            setInterventions(interventionsData);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des interventions:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };    useEffect(() => {
        // Filter interventions based on search term and date filter
        let results = interventions;
        
        if (searchTerm) {
            results = results.filter(intervention => 
                intervention.MOTIF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                intervention.TRAVAUX.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (dateFilter !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (dateFilter) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    results = results.filter(intervention => 
                        new Date(intervention.DATE_INTERVENTION) >= filterDate
                    );
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    results = results.filter(intervention => 
                        new Date(intervention.DATE_INTERVENTION) >= filterDate
                    );
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    results = results.filter(intervention => 
                        new Date(intervention.DATE_INTERVENTION) >= filterDate
                    );
                    break;
            }
        }
        
        setFilteredInterventions(results);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, dateFilter, interventions]);    // Pagination calculations
    const totalItems = interventions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = interventions.slice(startIndex, endIndex);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            DATE_INTERVENTION: '',
            MOTIF: '',
            TRAVAUX: ''
        });
        setError('');
        setSuccess('');
    };

    const handleInterventionClick = (intervention) => {
        navigate(`/interventions/${intervention.id}`);
    };
    
    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const openEditModal = (intervention, e) => {
        e.stopPropagation(); // Prevent navigation when clicking edit button
        setSelectedIntervention(intervention);
        setFormData({
            DATE_INTERVENTION: intervention.DATE_INTERVENTION || '',
            MOTIF: intervention.MOTIF || '',
            TRAVAUX: intervention.TRAVAUX || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (intervention, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete button
        setSelectedIntervention(intervention);
        setShowDeleteModal(true);
    };
    
    const handleAddIntervention = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newIntervention = await createIntervention(formData);
            setSuccess('Intervention ajoutée avec succès!');
            setShowAddModal(false);
            resetForm();
            fetchInterventions();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleEditIntervention = async (e) => {
        e.preventDefault();
        if (!selectedIntervention) return;
        
        try {
            setLoading(true);
            await updateIntervention(selectedIntervention.id, formData);
            setSuccess('Intervention mise à jour avec succès!');
            setShowEditModal(false);
            fetchInterventions();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDeleteIntervention = async () => {
        if (!selectedIntervention) return;
        
        try {
            setIsDeleting(true);
            await deleteIntervention(selectedIntervention.id);
            setSuccess('L\'intervention a été supprimée avec succès.');
            setShowDeleteModal(false);
            fetchInterventions();
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error deleting intervention:', err);
            setError(err.message || 'Une erreur s\'est produite lors de la suppression de l\'intervention.');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Show a loading indicator while fetching data
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des interventions...</p>
                </div>
            </div>
        );
    }

    // Render the table
    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Interventions</h2>
                    <div className="flex space-x-2">
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                            onClick={openAddModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Ajouter une intervention
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
                                className={`px-3 py-1 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                                onClick={() => setViewMode('grid')}
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

                {interventions.length === 0 ? (
                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
                        <h3 className="text-xl font-semibold text-yellow-700 mb-2">Aucune intervention trouvée</h3>
                        <p className="text-yellow-600">Aucune intervention n'a été trouvée dans la base de données.</p>
                    </div>
                ) : viewMode === 'table' ? (
                    <>
                        {/* Results info */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-600">
                                Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} interventions
                            </p>
                        <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-left text-gray-900 bg-white">
                                <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Motif</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Travaux</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((intervention) => (
                                    <tr 
                                        key={intervention.id} 
                                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => handleInterventionClick(intervention)}
                                    >                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8">
                                                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {formatDate(intervention.DATE_INTERVENTION)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Intervention #{intervention.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="max-w-xs truncate" title={intervention.MOTIF}>
                                                {intervention.MOTIF}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="max-w-xs truncate" title={intervention.TRAVAUX}>
                                                {intervention.TRAVAUX}
                                            </div>
                                        </td>                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2 justify-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInterventionClick(intervention);
                                                    }}
                                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                                    title="Voir les détails"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => openEditModal(intervention, e)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                                    title="Modifier"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => openDeleteModal(intervention, e)}
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                    title="Supprimer"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredInterventions.length === 0 && (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune intervention trouvée</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? 'Aucune intervention ne correspond à votre recherche.' : 'Commencez par ajouter une nouvelle intervention.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((intervention) => (
                            <div 
                                key={intervention.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                onClick={() => handleInterventionClick(intervention)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-sm text-gray-500">
                                        {formatDate(intervention.DATE_INTERVENTION)}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={(e) => openEditModal(intervention, e)}
                                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                            title="Modifier"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => openDeleteModal(intervention, e)}
                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                            title="Supprimer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {intervention.MOTIF}
                                </h3>
                                
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {intervention.TRAVAUX}
                                </p>
                            </div>
                        ))}

                        {filteredInterventions.length === 0 && (
                            <div className="col-span-full text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune intervention trouvée</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? 'Aucune intervention ne correspond à votre recherche.' : 'Commencez par ajouter une nouvelle intervention.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} interventions
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Précédent
                            </button>
                            
                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((pageNum, index) => (
                                    pageNum === '...' ? (
                                        <span key={index} className="px-3 py-2 text-sm text-gray-500">...</span>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => goToPage(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium border ${
                                                currentPage === pageNum
                                                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                            } transition-colors duration-200`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                ))}
                            </div>
                            
                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Ajouter une intervention</h2>
                        
                        <form onSubmit={handleAddIntervention}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date d'intervention *
                                    </label>
                                    <input
                                        type="date"
                                        name="DATE_INTERVENTION"
                                        value={formData.DATE_INTERVENTION}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Motif *
                                    </label>
                                    <input
                                        type="text"
                                        name="MOTIF"
                                        value={formData.MOTIF}
                                        onChange={handleInputChange}
                                        placeholder="Motif de l'intervention"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Travaux effectués *
                                    </label>
                                    <textarea
                                        name="TRAVAUX"
                                        value={formData.TRAVAUX}
                                        onChange={handleInputChange}
                                        placeholder="Description des travaux effectués"
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Ajout...' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedIntervention && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Modifier l'intervention</h2>
                        
                        <form onSubmit={handleEditIntervention}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date d'intervention *
                                    </label>
                                    <input
                                        type="date"
                                        name="DATE_INTERVENTION"
                                        value={formData.DATE_INTERVENTION}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Motif *
                                    </label>
                                    <input
                                        type="text"
                                        name="MOTIF"
                                        value={formData.MOTIF}
                                        onChange={handleInputChange}
                                        placeholder="Motif de l'intervention"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Travaux effectués *
                                    </label>
                                    <textarea
                                        name="TRAVAUX"
                                        value={formData.TRAVAUX}
                                        onChange={handleInputChange}
                                        placeholder="Description des travaux effectués"
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Modification...' : 'Modifier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteIntervention}
                title="Supprimer l'intervention"
                message={`Êtes-vous sûr de vouloir supprimer cette intervention ? Cette action est irréversible.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default InterventionsTable;
