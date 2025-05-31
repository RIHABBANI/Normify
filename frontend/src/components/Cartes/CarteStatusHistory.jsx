import React, { useState, useEffect } from 'react';
import { getCarteHistory } from '../../api/HistoriqueCarte/historique-carte-api';

export const CarteStatusHistory = ({ carteId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!carteId) return;
            
            try {
                setLoading(true);
                const data = await getCarteHistory(carteId);
                setHistory(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching card status history:', err);
                setError('Failed to load status history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [carteId]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'installee':
            case 'installée':
                return 'bg-green-100 text-green-800';
            case 'retirée':
            case 'retiree':
                return 'bg-red-100 text-red-800';
            case 'en maintenance':
                return 'bg-yellow-100 text-yellow-800';
            case 'en panne':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600">Aucun historique de statut disponible pour cette carte.</p>
            </div>
        );
    }    return (
        <div className="relative overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-900 bg-white">
                <thead className="text-xs uppercase bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                            Date et Heure
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                            Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                            Rame
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                            Rak
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-700">
                            Motrice
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr 
                            key={entry.id}
                            className={`${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } border-b border-gray-200 hover:bg-blue-50 transition-all duration-150`}
                        >
                            <td className="px-6 py-3">
                                {formatDate(entry.created_at)}
                            </td>
                            <td className="px-6 py-3">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(entry.STATUS)}`}>
                                    {entry.STATUS}
                                </span>
                            </td>
                            <td className="px-6 py-3">
                                {entry.carte?.rak?.rame?.NUMERO_RAME || 'N/A'}
                            </td>
                            <td className="px-6 py-3">
                                {entry.carte?.rak?.NOM_RAK || 'N/A'}
                            </td>
                            <td className="px-6 py-3">
                                {entry.carte?.rak?.MOTRICE || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarteStatusHistory;
