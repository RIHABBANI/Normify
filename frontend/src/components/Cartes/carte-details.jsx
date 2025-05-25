import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarteById, updateCarte, deleteCarte } from '../../api/Carte/carte-api';
import { getRaks } from '../../api/Rak/rak-api';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';
import CarteReplacementHistory from './CarteReplacementHistory';

export const CarteDetails = () => {
    const { carteId } = useParams();
    const navigate = useNavigate();
    
    const [carte, setCarte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [raks, setRaks] = useState([]);
    
    const [formData, setFormData] = useState({
        ID_RAK: '',
        REFERENCE_CARTE: '',
        STATU_CARTE: ''
    });
    
    const statusOptions = [
        'Fonctionnel', 
        'En panne',
        'En réparation',
        'Hors service'
    ];

    // Fetch the carte details
    useEffect(() => {
        const fetchCarteDetails = async () => {
            try {
                setLoading(true);
                
                // Fetch carte data
                const carteData = await getCarteById(carteId);
                setCarte(carteData);
                
                // Initialize form data with carte details
                setFormData({
                    ID_RAK: carteData.ID_RAK,
                    REFERENCE_CARTE: carteData.REFERENCE_CARTE,
                    STATU_CARTE: carteData.STATU_CARTE
                });
                
                // Fetch raks for the dropdown
                const raksData = await getRaks();
                setRaks(raksData);
                
                setError(null);
            } catch (err) {
                console.error('Error fetching carte details:', err);
                setError('Failed to load carte details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (carteId) {
            fetchCarteDetails();
        }
    }, [carteId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            await updateCarte(carteId, formData);
            
            // Refetch carte details to update the UI
            const updatedCarte = await getCarteById(carteId);
            setCarte(updatedCarte);
            
            setIsEditing(false);
            setError(null);
        } catch (err) {
            console.error('Error updating carte:', err);
            setError('Failed to update carte. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteCarte(carteId);
            navigate('/cartes');
        } catch (err) {
            console.error('Error deleting carte:', err);
            setError('Failed to delete carte. Please try again.');
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to original carte values
        setFormData({
            ID_RAK: carte.ID_RAK,
            REFERENCE_CARTE: carte.REFERENCE_CARTE,
            STATU_CARTE: carte.STATU_CARTE
        });
        setIsEditing(false);
    };

    if (loading && !carte) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (error && !carte) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => navigate('/cartes')}
                    >
                        Retour à la liste des cartes
                    </button>
                </div>
            </div>
        );
    }

    if (!carte) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header with navigation */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/cartes')}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Retour à la liste des cartes
                    </button>
                </div>
                
                <div className="flex space-x-2">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Supprimer
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Enregistrer
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Carte details card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Carte {carte.REFERENCE_CARTE}
                    </h1>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 rounded-md border border-red-200">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Référence Carte
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="REFERENCE_CARTE"
                                        value={formData.REFERENCE_CARTE}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="text-lg">{carte.REFERENCE_CARTE}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut
                                </label>
                                {isEditing ? (
                                    <select
                                        name="STATU_CARTE"
                                        value={formData.STATU_CARTE}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                                        ${carte.STATU_CARTE === 'Fonctionnel' ? 'bg-green-100 text-green-800' : 
                                        carte.STATU_CARTE === 'En panne' ? 'bg-red-100 text-red-800' : 
                                        carte.STATU_CARTE === 'En réparation' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-gray-100 text-gray-800'}`}
                                    >
                                        {carte.STATU_CARTE}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    RAK
                                </label>
                                {isEditing ? (
                                    <select
                                        name="ID_RAK"
                                        value={formData.ID_RAK}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {raks.map(rak => (
                                            <option key={rak.id} value={rak.id}>
                                                {rak.REFERENCE_RAK}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-lg">{carte.rak?.REFERENCE_RAK}</p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>            {/* Replacement History Section */}
            <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Historique des Remplacements</h2>
                <CarteReplacementHistory carteId={carteId} />
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Supprimer la carte"
                message={`Êtes-vous sûr de vouloir supprimer la carte ${carte.REFERENCE_CARTE} ? Cette action est irréversible.`}
            />
        </div>
    );
};

export default CarteDetails;
