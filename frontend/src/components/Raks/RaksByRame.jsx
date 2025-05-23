import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRaksByRame, createRak, updateRak, deleteRak } from '../../api/Rak/rak-api';

export const RaksByRame = () => {
    const [raks, setRaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRak, setSelectedRak] = useState(null);
    const [formData, setFormData] = useState({
        NOM_RAK: '',
        ID_RAME: ''
    });
    
    const { rameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRaksByRame();
    }, [rameId]);

    const fetchRaksByRame = async () => {
        try {
            setLoading(true);
            const data = await getRaksByRame(rameId);
            setRaks(data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors de la récupération des raks pour la rame:', err.message);
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

    const resetForm = () => {
        setFormData({
            NOM_RAK: '',
            ID_RAME: rameId
        });
        setError('');
        setSuccess('');
    };

    const handleRakClick = (rak) => {
        navigate(`/cartes/rak/${rak.id}`);
    };

    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const openEditModal = (rak, e) => {
        e.stopPropagation(); // Prevent navigation when clicking edit button
        setSelectedRak(rak);
        setFormData({
            NOM_RAK: rak.NOM_RAK || '',
            ID_RAME: rameId
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (rak, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete button
        setSelectedRak(rak);
        setShowDeleteModal(true);
    };

    const handleAddRak = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createRak(formData);
            setSuccess('Rak ajouté avec succès!');
            setShowAddModal(false);
            resetForm();
            fetchRaksByRame();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditRak = async (e) => {
        e.preventDefault();
        if (!selectedRak) return;
        
        try {
            setLoading(true);
            await updateRak(selectedRak.id, formData);
            setSuccess('Rak modifié avec succès!');
            setShowEditModal(false);
            resetForm();
            fetchRaksByRame();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRak = async () => {
        if (!selectedRak) return;
        
        try {
            setLoading(true);
            await deleteRak(selectedRak.id);
            setSuccess('Rak supprimé avec succès!');
            setShowDeleteModal(false);
            fetchRaksByRame();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && raks.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des raks...</p>
                </div>
            </div>
        );
    }

    if (error && !raks.length) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => navigate('/rames')}
                    >
                        Retour aux Rames
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Raks pour la Rame #{rameId}</h2>
                    <p className="text-sm text-gray-600 mt-1">Total : {raks.length} raks</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => navigate('/rames')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux Rames
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={openAddModal}
                    >
                        + Ajouter un RAK
                    </button>
                </div>
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
            
            {!raks.length ? (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">Aucun Rak trouvé</h3>
                    <p className="text-yellow-600">Cette rame n'a pas de raks associés.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={openAddModal}
                    >
                        + Ajouter un RAK
                    </button>
                </div>
            ) : (
                <>
                    <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-900 bg-white">
                            <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ID</th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Numéro RAK</th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {raks.map((rak, index) => (
                                    <tr
                                        key={rak.id || index}
                                        className={`${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-all duration-150`}
                                        onClick={() => handleRakClick(rak)}
                                    >
                                        <td className="px-6 py-3 font-medium">{rak.id}</td>
                                        <td className="px-6 py-3">{rak.NOM_RAK}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex space-x-3">
                                                <button 
                                                    onClick={(e) => openEditModal(rak, e)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Modifier"
                                                >
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={(e) => openDeleteModal(rak, e)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Supprimer"
                                                >
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="text-green-600 hover:text-green-800"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRakClick(rak);
                                                    }}
                                                    title="Voir les cartes"
                                                >
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                        Cliquez sur un rak pour voir les détails des cartes
                    </div>
                </>
            )}

            {/* Add Rak Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Ajouter un RAK</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddRak} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom du RAK</label>
                                <input
                                    type="text"
                                    name="NOM_RAK"
                                    value={formData.NOM_RAK}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            
                            <div className="hidden">
                                <input type="hidden" name="ID_RAME" value={rameId} />
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

            {/* Edit Rak Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Modifier le RAK</h2>
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleEditRak} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom du RAK</label>
                                <input
                                    type="text"
                                    name="NOM_RAK"
                                    value={formData.NOM_RAK}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            
                            <div className="hidden">
                                <input type="hidden" name="ID_RAME" value={rameId} />
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

            {/* Delete Rak Modal */}
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
                                Êtes-vous sûr de vouloir supprimer le RAK <span className="font-semibold">{selectedRak?.NOM_RAK}</span>?
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
                                onClick={handleDeleteRak}
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
};

export default RaksByRame;
