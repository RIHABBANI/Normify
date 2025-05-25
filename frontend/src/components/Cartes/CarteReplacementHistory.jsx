import React, { useState, useEffect } from 'react';
import { getRemplacementCartesByCarteId } from '../../api/RemplacementCarte/remplacement-carte-api';

export const CarteReplacementHistory = ({ carteId }) => {
    const [replacements, setReplacements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReplacements = async () => {
            if (!carteId) return;
            
            try {
                setLoading(true);
                // We'll need to create this API endpoint
                const data = await getRemplacementCartesByCarteId(carteId);
                setReplacements(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching replacement history:', err);
                setError('Failed to load replacement history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReplacements();
    }, [carteId]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    if (replacements.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-600">Aucun historique de remplacement disponible pour cette carte.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date de Remplacement
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rame
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rak
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Raison
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Technicien
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {replacements.map((replacement) => (
                        <tr key={replacement.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(replacement.DATE_REMPLACEMENT)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {replacement.rame?.NUMERO_RAME || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {replacement.rak?.REFERENCE_RAK || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {replacement.RAISON_REMPLACEMENT}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {replacement.user?.name || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarteReplacementHistory;
