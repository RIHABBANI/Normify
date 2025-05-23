import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { getRames, createRame, updateRame, deleteRame } from '../../api/Rame/rame-api';


export const RamesTable = () => {
    const [rames, setRames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRame, setSelectedRame] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        NUMERO_RAME: '',
        TYPE_RAME: '',
        DATE_MISE_EN_SERVICR_RAME: ''
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchRames();
    }, []);

    const fetchRames = async () => {
        try {
            setLoading(true);
            const data = await getRames();
            console.log(data);
            setRames(data);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des données Rame:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRameClick = (rame) => {
        setSelectedRame(rame.id);
        // Navigate to raks with the rame id
        navigate(`/raks/${rame.id}`);
    };

    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const openEditModal = (rame, e) => {
        e.stopPropagation(); // Prevent navigation when clicking edit button
        setSelectedRame(rame);
        setFormData({
            NUMERO_RAME: rame.NUMERO_RAME || '',
            TYPE_RAME: rame.TYPE_RAME || '',
            DATE_MISE_EN_SERVICR_RAME: rame.DATE_MISE_EN_SERVICR_RAME || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (rame, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete button
        setSelectedRame(rame);
        setShowDeleteModal(true);
    };

    const resetForm = () => {
        setFormData({
            NUMERO_RAME: '',
            TYPE_RAME: '',
            DATE_MISE_EN_SERVICR_RAME: ''
        });
        setError('');
        setSuccess('');
    };

    const handleAddRame = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createRame(formData);
            setSuccess('Rame ajoutée avec succès!');
            setShowAddModal(false);
            resetForm();
            fetchRames();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditRame = async (e) => {
        e.preventDefault();
        if (!selectedRame) return;
        
        try {
            setLoading(true);
            await updateRame(selectedRame.id, formData);
            setSuccess('Rame modifiée avec succès!');
            setShowEditModal(false);
            resetForm();
            fetchRames();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRame = async () => {
        if (!selectedRame) return;
        
        try {
            setLoading(true);
            await deleteRame(selectedRame.id);
            setSuccess('Rame supprimée avec succès!');
            setShowDeleteModal(false);
            fetchRames();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Show a loading indicator while fetching data
    if (loading && rames.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des rames...</p>
                </div>
            </div>
        );
    }

    // Render the table
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Rames</h2>
                <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={openAddModal}
                >
                    + Ajouter une rame
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}

            <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-900 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ID</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Numéro Rame</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Type Rame</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Date Mise En Service</th>
                            <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rames.map((rame, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRameClick(rame)}
                                className={`${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-all duration-150 ${
                                    selectedRame === rame.id ? "bg-blue-50" : ""
                                }`}
                            >
                                <td className="px-6 py-3 font-medium">{rame.id}</td>
                                <td className="px-6 py-3">{rame.NUMERO_RAME}</td>
                                <td className="px-6 py-3">{rame.TYPE_RAME}</td>
                                <td className="px-6 py-3">{rame.DATE_MISE_EN_SERVICR_RAME}</td>
                                <td className="px-6 py-3">
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={(e) => openEditModal(rame, e)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Modifier"
                                        >
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={(e) => openDeleteModal(rame, e)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Supprimer"
                                        >
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
            <div className="mt-4 text-sm text-gray-500">
                Cliquez sur une rame pour voir ses détails de raks
            </div>

            {/* Add Rame Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Ajouter une rame</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddRame} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Numéro de Rame</label>
                                <input
                                    type="text"
                                    name="NUMERO_RAME"
                                    value={formData.NUMERO_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Type de Rame</label>
                                <input
                                    type="text"
                                    name="TYPE_RAME"
                                    value={formData.TYPE_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de Mise en Service</label>
                                <input
                                    type="date"
                                    name="DATE_MISE_EN_SERVICR_RAME"
                                    value={formData.DATE_MISE_EN_SERVICR_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Rame Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Modifier la rame</h2>
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleEditRame} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Numéro de Rame</label>
                                <input
                                    type="text"
                                    name="NUMERO_RAME"
                                    value={formData.NUMERO_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Type de Rame</label>
                                <input
                                    type="text"
                                    name="TYPE_RAME"
                                    value={formData.TYPE_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de Mise en Service</label>
                                <input
                                    type="date"
                                    name="DATE_MISE_EN_SERVICR_RAME"
                                    value={formData.DATE_MISE_EN_SERVICR_RAME}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Rame Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2>
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-700">
                                Êtes-vous sûr de vouloir supprimer la rame <span className="font-semibold">{selectedRame?.NUMERO_RAME}</span>?
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteRame}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RamesTable;
