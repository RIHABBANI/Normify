import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCartesByRak } from '../../api/Carte/carte-api';

export const CartesByRak = () => {
    const [cartes, setCartes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { rakId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartesByRak = async () => {
            try {
                setLoading(true);
                const data = await getCartesByRak(rakId);
                setCartes(data);
                setError(null);
            } catch (err) {
                console.error('Erreur lors de la récupération des cartes pour le rak:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (rakId) {
            fetchCartesByRak();
        }
    }, [rakId]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des cartes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => navigate(`/raks/${rakId.split('-')[0]}`)}
                    >
                        Retour aux Raks
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Cartes pour Rak #{rakId}</h2>
                    <p className="text-sm text-gray-600 mt-1">Total : {cartes.length} cartes</p>
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    onClick={() => navigate(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour aux Raks
                </button>
            </div>
            
            {cartes.length === 0 ? (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">Aucune Carte trouvée</h3>
                    <p className="text-yellow-600">Ce rak n'a pas de cartes associées.</p>
                </div>
            ) : (
                <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-900 bg-white">
                        <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th scope="col" className="p-3">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-500 bg-white rounded focus:ring-2 focus:ring-blue-400"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">ID</th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Référence</th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Statut</th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartes.map((carte, index) => (                                <tr
                                    key={carte.id || index}
                                    className={`${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b border-gray-200 hover:bg-blue-50 transition-all duration-150 cursor-pointer`}
                                    onClick={() => navigate(`/cartes/${carte.id}`)}
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-${carte.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                            />
                                            <label htmlFor={`checkbox-${carte.id}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 font-medium">{carte.id}</td>
                                    <td className="px-6 py-3">{carte.REFERENCE_CARTE}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            carte.STATU_CARTE === 'Fonctionnel' 
                                                ? 'bg-green-100 text-green-800' 
                                                : carte.STATU_CARTE === 'En panne' 
                                                ? 'bg-red-100 text-red-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {carte.STATU_CARTE}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex space-x-3">                                            <button 
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Détails"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/cartes/${carte.id}`);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Modifier"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-800" 
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            )}
            
            <div className="mt-4 text-sm text-gray-500">
                {cartes.length > 0 ? 
                    "Cliquez sur les actions pour gérer les cartes" : 
                    "Aucune carte n'est disponible pour ce rak"
                }
            </div>
        </div>
    );
};

export default CartesByRak;
