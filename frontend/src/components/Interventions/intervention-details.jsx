import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIntervention } from '../../api/Intervention/intervention-api';

export const InterventionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [intervention, setIntervention] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchIntervention();
    }, [id]);

    const fetchIntervention = async () => {
        try {
            setLoading(true);
            const interventionData = await getIntervention(id);
            setIntervention(interventionData);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération de l\'intervention:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement de l'intervention...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Erreur</h3>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/interventions')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Retour aux interventions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!intervention) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Intervention non trouvée</h3>
                    <p className="mt-1 text-sm text-gray-500">L'intervention demandée n'existe pas ou a été supprimée.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/interventions')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Retour aux interventions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Détails de l'intervention</h1>
                        <p className="text-gray-600 mt-1">
                            Intervention du {formatDate(intervention.DATE_INTERVENTION)}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/interventions')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </button>
                </div>
            </div>

            {/* Intervention Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de l'intervention</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date d'intervention */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-700">Date d'intervention</h3>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                            {formatDate(intervention.DATE_INTERVENTION)}
                        </p>
                    </div>

                    {/* Date de création */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-700">Créée le</h3>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                            {formatDateTime(intervention.created_at)}
                        </p>
                    </div>
                </div>

                {/* Motif */}
                <div className="mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">Motif de l'intervention</h3>
                        </div>
                        <p className="text-gray-800 leading-relaxed">
                            {intervention.MOTIF}
                        </p>
                    </div>
                </div>

                {/* Travaux */}
                <div className="mt-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">Travaux effectués</h3>
                        </div>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {intervention.TRAVAUX}
                        </p>
                    </div>
                </div>

                {/* Metadata */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Métadonnées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-700">ID:</span>
                            <span className="ml-2 text-gray-600">#{intervention.id}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Dernière modification:</span>
                            <span className="ml-2 text-gray-600">{formatDateTime(intervention.updated_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterventionDetails;
