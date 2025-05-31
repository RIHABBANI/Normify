import React, { useState, useEffect } from 'react';
import { getCarteById } from '../../api/Carte/carte-api';

export const CarteDetailsModal = ({ isOpen, onClose, carteId }) => {
    const [carte, setCarte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarteDetails = async () => {
            if (!carteId) return;
            
            try {
                setLoading(true);
                const carteData = await getCarteById(carteId);
                setCarte(carteData);
                setError(null);
            } catch (err) {
                console.error('Error fetching carte details:', err);
                setError('Failed to load carte details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && carteId) {
            fetchCarteDetails();
        }
    }, [isOpen, carteId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Détails de la Carte</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-red-700">{error}</p>
                    </div>
                ) : carte ? (
                    <div className="space-y-4">
                        <div className={`h-2 ${
                            carte.STATU_CARTE === 'Fonctionnel' 
                                ? 'bg-green-500' 
                                : carte.STATU_CARTE === 'En panne' 
                                ? 'bg-red-500' 
                                : carte.STATU_CARTE === 'hors service'
                                ? 'bg-gray-500'
                                : 'bg-yellow-500'
                        }`}></div>
                        
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{carte.REFERENCE_CARTE}</h3>                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                carte.STATU_CARTE === 'Fonctionnel' 
                                    ? 'bg-green-100 text-green-800' 
                                    : carte.STATU_CARTE === 'En panne' 
                                    ? 'bg-red-100 text-red-800' 
                                    : carte.STATU_CARTE === 'hors service'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {carte.STATU_CARTE}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">ID</p>
                                <p className="font-medium">{carte.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Rack ID</p>
                                <p className="font-medium">{carte.ID_RAK}</p>
                            </div>
                        </div>
                        
                        {carte.rak && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Rack</p>
                                <p className="font-medium">{carte.rak.NOM_RAK}</p>
                            </div>
                        )}
                        
                        {carte.created_at && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Créé le</p>
                                <p className="font-medium">{new Date(carte.created_at).toLocaleDateString()}</p>
                            </div>
                        )}
                        
                        {carte.updated_at && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Dernière mise à jour</p>
                                <p className="font-medium">{new Date(carte.updated_at).toLocaleDateString()}</p>
                            </div>
                        )}
                        
                        {carte.pannes && carte.pannes.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 font-medium">Pannes associées</p>
                                <ul className="mt-2 list-disc list-inside">
                                    {carte.pannes.map(panne => (
                                        <li key={panne.ID_PANNE} className="text-sm">
                                            {panne.DESCRIPTION_PANNE} 
                                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                panne.GRAVITE_PANNE === 'Critique' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : panne.GRAVITE_PANNE === 'Majeur' 
                                                    ? 'bg-orange-100 text-orange-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {panne.GRAVITE_PANNE}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-yellow-700">Aucune donnée disponible pour cette carte.</p>
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarteDetailsModal;
