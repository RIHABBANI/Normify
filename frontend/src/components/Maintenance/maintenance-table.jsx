import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMaintenances, createMaintenance, updateMaintenance, deleteMaintenance } from '../../api/Maintenance/maintenance-api';

export const MaintenanceTable = () => {
    const navigate = useNavigate();
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Form data
    const [formData, setFormData] = useState({
        DATE_MAINTENANCE: '',
        SIGNALEMENT_MAINTENANCE: '',
        ANOMALIE_MAINTENANCE: '',
        ORGANE_MAINTENANCE: ''
    });
    
    useEffect(() => {
        fetchMaintenances();
    }, []);    const fetchMaintenances = async () => {
        try {
            setLoading(true);
            const data = await getMaintenances();
            setMaintenances(data);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des maintenances:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination calculations
    const totalItems = maintenances.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;    const endIndex = startIndex + itemsPerPage;
    const currentItems = maintenances.slice(startIndex, endIndex);

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
            DATE_MAINTENANCE: '',
            SIGNALEMENT_MAINTENANCE: '',
            ANOMALIE_MAINTENANCE: '',
            ORGANE_MAINTENANCE: ''
        });
        setError('');
        setSuccess('');
    };

    const handleMaintenanceClick = (maintenance) => {
        navigate(`/maintenances/${maintenance.id}`);
    };
    
    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const openEditModal = (maintenance, e) => {
        e.stopPropagation(); // Prevent navigation when clicking edit button
        setSelectedMaintenance(maintenance);
        setFormData({
            DATE_MAINTENANCE: maintenance.DATE_MAINTENANCE ? maintenance.DATE_MAINTENANCE.split('T')[0] : '',
            SIGNALEMENT_MAINTENANCE: maintenance.SIGNALEMENT_MAINTENANCE || '',
            ANOMALIE_MAINTENANCE: maintenance.ANOMALIE_MAINTENANCE || '',
            ORGANE_MAINTENANCE: maintenance.ORGANE_MAINTENANCE || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (maintenance, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete button
        setSelectedMaintenance(maintenance);
        setShowDeleteModal(true);
    };
    
    const handleAddMaintenance = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newMaintenance = await createMaintenance(formData);
            setSuccess('Maintenance ajoutée avec succès!');
            setShowAddModal(false);
            resetForm();
            fetchMaintenances();
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleEditMaintenance = async (e) => {
        e.preventDefault();
        if (!selectedMaintenance) return;
        
        try {
            setLoading(true);
            await updateMaintenance(selectedMaintenance.id, formData);
            setSuccess('Maintenance mise à jour avec succès!');
            setShowEditModal(false);
            fetchMaintenances();
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDeleteMaintenance = async () => {
        if (!selectedMaintenance) return;
        
        try {
            setIsDeleting(true);
            await deleteMaintenance(selectedMaintenance.id);
            setSuccess('La maintenance a été supprimée avec succès.');
            setShowDeleteModal(false);
            fetchMaintenances();
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error deleting maintenance:', err);
            setError(err.message || 'Une erreur s\'est produite lors de la suppression de la maintenance.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    // Show a loading indicator while fetching data
    if (loading && maintenances.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des maintenances...</p>
                </div>
            </div>
        );
    }

    // Render the table
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Maintenances</h2>
                    <div className="flex space-x-2">
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                            onClick={openAddModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Ajouter une maintenance
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
                            </button>                        <button
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
                </div>                {/* Success message */}
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

                {maintenances.length === 0 ? (
                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
                        <h3 className="text-xl font-semibold text-yellow-700 mb-2">Aucune maintenance trouvée</h3>
                        <p className="text-yellow-600">Aucune maintenance n'a été trouvée dans la base de données.</p>
                    </div>
                ) : viewMode === 'table' ? (
                    <>
                        {/* Results info */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-600">
                                Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} maintenances
                            </p>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-left text-gray-900 bg-white">
                                <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">DATE</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">SIGNALEMENT</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ANOMALIE</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ORGANE</th>
                                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((maintenance, index) => (
                                        <tr
                                            key={maintenance.id || index}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 hover:bg-blue-50 transition-all duration-150 cursor-pointer`}
                                            onClick={() => handleMaintenanceClick(maintenance)}
                                        >
                                            <td className="px-6 py-3">{formatDate(maintenance.DATE_MAINTENANCE)}</td>
                                            <td className="px-6 py-3">
                                                <div className="max-w-xs truncate" title={maintenance.SIGNALEMENT_MAINTENANCE}>
                                                    {maintenance.SIGNALEMENT_MAINTENANCE}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="max-w-xs truncate" title={maintenance.ANOMALIE_MAINTENANCE}>
                                                    {maintenance.ANOMALIE_MAINTENANCE}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="max-w-xs truncate" title={maintenance.ORGANE_MAINTENANCE}>
                                                    {maintenance.ORGANE_MAINTENANCE}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex space-x-3">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-800 p-1"
                                                        title="Modifier"
                                                        onClick={(e) => openEditModal(maintenance, e)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Supprimer"
                                                        onClick={(e) => openDeleteModal(maintenance, e)}
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
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} maintenances
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
                    </>
                ) : (
                    <>
                        {/* Results info for grid view */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-600">
                                Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} maintenances
                            </p>
                        </div>

                        {/* Grid View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((maintenance, index) => (
                                <div 
                                    key={maintenance.id || index}
                                    className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                                    onClick={() => handleMaintenanceClick(maintenance)}
                                >
                                    <div className="h-2 bg-orange-500"></div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-800">
                                                Maintenance #{maintenance.id}
                                            </h3>
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                                                {formatDate(maintenance.DATE_MAINTENANCE)}
                                            </span>
                                        </div>
                                        <div className="mb-4 text-sm text-gray-600">
                                            <p><span className="font-semibold">Signalement:</span></p>
                                            <p className="line-clamp-2 text-gray-800" title={maintenance.SIGNALEMENT_MAINTENANCE}>
                                                {maintenance.SIGNALEMENT_MAINTENANCE}
                                            </p>
                                            <p className="mt-2"><span className="font-semibold">Anomalie:</span></p>
                                            <p className="line-clamp-2 text-gray-800" title={maintenance.ANOMALIE_MAINTENANCE}>
                                                {maintenance.ANOMALIE_MAINTENANCE}
                                            </p>
                                            <p className="mt-2"><span className="font-semibold">Organe:</span> {maintenance.ORGANE_MAINTENANCE}</p>
                                        </div>
                                        <div className="flex justify-between mt-4 space-x-2">
                                            <button 
                                                className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditModal(maintenance, e);
                                                }}
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteModal(maintenance, e);
                                                }}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination for grid view */}
                        {totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} maintenances
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
                    </>
                )}
            </div>
            
            {/* Add Maintenance Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter une maintenance</h2>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleAddMaintenance}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DATE_MAINTENANCE">
                                    Date de maintenance *
                                </label>
                                <input 
                                    type="date" 
                                    id="DATE_MAINTENANCE"
                                    name="DATE_MAINTENANCE"
                                    value={formData.DATE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SIGNALEMENT_MAINTENANCE">
                                    Signalement *
                                </label>
                                <textarea
                                    id="SIGNALEMENT_MAINTENANCE"
                                    name="SIGNALEMENT_MAINTENANCE"
                                    value={formData.SIGNALEMENT_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Décrivez le signalement de la maintenance"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ANOMALIE_MAINTENANCE">
                                    Anomalie *
                                </label>
                                <textarea
                                    id="ANOMALIE_MAINTENANCE"
                                    name="ANOMALIE_MAINTENANCE"
                                    value={formData.ANOMALIE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Décrivez l'anomalie détectée"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ORGANE_MAINTENANCE">
                                    Organe concerné *
                                </label>
                                <input 
                                    type="text" 
                                    id="ORGANE_MAINTENANCE"
                                    name="ORGANE_MAINTENANCE"
                                    value={formData.ORGANE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Spécifiez l'organe ou le composant concerné"
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
            
            {/* Edit Maintenance Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Modifier la maintenance</h2>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleEditMaintenance}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_DATE_MAINTENANCE">
                                    Date de maintenance *
                                </label>
                                <input 
                                    type="date" 
                                    id="edit_DATE_MAINTENANCE"
                                    name="DATE_MAINTENANCE"
                                    value={formData.DATE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_SIGNALEMENT_MAINTENANCE">
                                    Signalement *
                                </label>
                                <textarea
                                    id="edit_SIGNALEMENT_MAINTENANCE"
                                    name="SIGNALEMENT_MAINTENANCE"
                                    value={formData.SIGNALEMENT_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Décrivez le signalement de la maintenance"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_ANOMALIE_MAINTENANCE">
                                    Anomalie *
                                </label>
                                <textarea
                                    id="edit_ANOMALIE_MAINTENANCE"
                                    name="ANOMALIE_MAINTENANCE"
                                    value={formData.ANOMALIE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Décrivez l'anomalie détectée"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_ORGANE_MAINTENANCE">
                                    Organe concerné *
                                </label>
                                <input 
                                    type="text" 
                                    id="edit_ORGANE_MAINTENANCE"
                                    name="ORGANE_MAINTENANCE"
                                    value={formData.ORGANE_MAINTENANCE} 
                                    onChange={handleInputChange}
                                    placeholder="Spécifiez l'organe ou le composant concerné"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmer la suppression</h2>
                        <p className="text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer cette maintenance du {formatDate(selectedMaintenance?.DATE_MAINTENANCE)} ? 
                            Cette action est irréversible.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                disabled={isDeleting}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteMaintenance}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MaintenanceTable;
