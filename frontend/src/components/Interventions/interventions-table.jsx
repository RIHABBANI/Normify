import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { getInterventions, createIntervention, updateIntervention, deleteIntervention } from '../../api/Intervention/intervention-api';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';

export const InterventionsTable = () => {
    const navigate = useNavigate();
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
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
    
    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {
        try {
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
    };

    // Pagination calculations
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
        e.stopPropagation();
        setSelectedIntervention(intervention);
        setFormData({
            DATE_INTERVENTION: intervention.DATE_INTERVENTION || '',
            MOTIF: intervention.MOTIF || '',
            TRAVAUX: intervention.TRAVAUX || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (intervention, e) => {
        e.stopPropagation();
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
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error adding intervention:', err);
            setError(err.message || 'Une erreur s\'est produite lors de l\'ajout de l\'intervention.');
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
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error updating intervention:', err);
            setError(err.message || 'Une erreur s\'est produite lors de la modification de l\'intervention.');
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
        if (!dateString) return 'Non spécifié';
        return new Date(dateString).toLocaleDateString('fr-FR');
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
            <div className="bg-white p-6 rounded-xl shadow-md">
                {/* Header */}
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
                        </div>

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
                                    {currentItems.map((intervention, index) => (
                                        <tr
                                            key={intervention.id || index}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 hover:bg-blue-50 transition-all duration-150 cursor-pointer`}
                                            onClick={() => handleInterventionClick(intervention)}
                                        >                                            <td className="px-6 py-3">{formatDate(intervention.DATE_INTERVENTION)}</td>
                                            <td className="px-6 py-3">
                                                <div className="max-w-xs break-words whitespace-pre-wrap">
                                                    {intervention.MOTIF}
                                                </div>
                                            </td>                                            <td className="px-6 py-3">
                                                <div className="w-full break-words whitespace-pre-wrap">
                                                    {intervention.TRAVAUX}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex space-x-3">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-800 p-1"
                                                        title="Modifier"
                                                        onClick={(e) => openEditModal(intervention, e)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Supprimer"
                                                        onClick={(e) => openDeleteModal(intervention, e)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                <div className="text-sm text-gray-600">
                                    Page {currentPage} sur {totalPages}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={goToPrevious}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 text-sm border rounded-md ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Précédent
                                    </button>
                                    
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-1 text-sm border rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={goToNext}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 text-sm border rounded-md ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* Results info for grid view */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-600">
                                Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} interventions
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentItems.map((intervention, index) => (
                                <div 
                                    key={intervention.id || index}
                                    className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                >
                                    <div className="h-2 bg-blue-500"></div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-800 truncate" title={intervention.MOTIF}>
                                                {intervention.MOTIF}
                                            </h3>
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                                {formatDate(intervention.DATE_INTERVENTION)}
                                            </span>
                                        </div>
                                        <div className="mb-4 text-sm text-gray-600">
                                            <p><span className="font-semibold">ID:</span> {intervention.id}</p>
                                            <p><span className="font-semibold">Travaux:</span> {intervention.TRAVAUX || 'Non spécifié'}</p>
                                        </div>
                                        <div className="flex justify-between mt-4 space-x-2">
                                            <button 
                                                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                onClick={() => navigate(`/interventions/${intervention.id}`)}
                                            >
                                                Détails
                                            </button>
                                            <button 
                                                className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditModal(intervention, e);
                                                }}
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteModal(intervention, e);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination for grid view */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6">
                                <div className="text-sm text-gray-600">
                                    Page {currentPage} sur {totalPages}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={goToPrevious}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 text-sm border rounded-md ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Précédent
                                    </button>
                                    
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-1 text-sm border rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={goToNext}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 text-sm border rounded-md ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
                
            </div>
            
            {/* Add Intervention Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une Intervention</h2>
                        
                        {error && (
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleAddIntervention}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DATE_INTERVENTION">
                                    Date d'intervention
                                </label>
                                <input 
                                    type="date" 
                                    id="DATE_INTERVENTION"
                                    name="DATE_INTERVENTION"
                                    value={formData.DATE_INTERVENTION} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="MOTIF">
                                    Motif
                                </label>
                                <input 
                                    type="text" 
                                    id="MOTIF"
                                    name="MOTIF"
                                    value={formData.MOTIF} 
                                    onChange={handleInputChange}
                                    placeholder="Motif de l'intervention"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TRAVAUX">
                                    Travaux
                                </label>
                                <textarea 
                                    id="TRAVAUX"
                                    name="TRAVAUX"
                                    value={formData.TRAVAUX} 
                                    onChange={handleInputChange}
                                    placeholder="Description des travaux effectués"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    disabled={loading}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Ajout...
                                        </span>
                                    ) : (
                                        'Ajouter'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Edit Intervention Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier l'Intervention</h2>
                        
                        {error && (
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleEditIntervention}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_DATE_INTERVENTION">
                                    Date d'intervention
                                </label>
                                <input 
                                    type="date" 
                                    id="edit_DATE_INTERVENTION"
                                    name="DATE_INTERVENTION"
                                    value={formData.DATE_INTERVENTION} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_MOTIF">
                                    Motif
                                </label>
                                <input 
                                    type="text" 
                                    id="edit_MOTIF"
                                    name="MOTIF"
                                    value={formData.MOTIF} 
                                    onChange={handleInputChange}
                                    placeholder="Motif de l'intervention"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_TRAVAUX">
                                    Travaux
                                </label>
                                <textarea 
                                    id="edit_TRAVAUX"
                                    name="TRAVAUX"
                                    value={formData.TRAVAUX} 
                                    onChange={handleInputChange}
                                    placeholder="Description des travaux effectués"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    disabled={loading}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Modification...
                                        </span>
                                    ) : (
                                        'Modifier'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteIntervention}
                    title="Supprimer l'intervention"
                    message={`Êtes-vous sûr de vouloir supprimer l'intervention "${selectedIntervention?.MOTIF}" ? Cette action est irréversible.`}
                    isDeleting={isDeleting}
                />
            )}
        </>
    );
};

export default InterventionsTable;
