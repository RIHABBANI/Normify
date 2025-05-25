import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRameById } from '../../api/Rame/rame-api';
import { getRemplacementsByRame, createRemplacementCarte } from '../../api/RemplacementCarte/remplacement-carte-api';
import { getCartesByRameId } from '../../api/Carte/carte-api-by-rame';
import { getRaksByRame } from '../../api/Rak/rak-api';

export const RameDetails = () => {
    const [rame, setRame] = useState(null);
    const [remplacements, setRemplacements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);    const [formData, setFormData] = useState({
        ID_CARTE_ANCIENNE: '',
        REFERENCE_CARTE: '',
        STATU_CARTE: 'Fonctionnel',
        DATE_REMPLACEMENT: new Date().toISOString().split('T')[0],
        OBSERVATIONS: ''
    });
    const [availableCartes, setAvailableCartes] = useState([]);
    // const [availableRaks, setAvailableRaks] = useState([]);
    const [success, setSuccess] = useState('');
    const { rameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const rameData = await getRameById(rameId);
                setRame(rameData);
                  // Fetch replacement history for this rame
                try {
                    const remplacementData = await getRemplacementsByRame(rameId);
                    console.log('Remplacement data:', remplacementData);
                    setRemplacements(remplacementData);
                      // Also fetch all cartes for this rame for the replacement form
                    const cartesData = await getCartesByRameId(rameId);
                    setAvailableCartes(cartesData);
                    
                    // Fetch all RAKs for this rame for the new carte form
                    const raksData = await getRaksByRame(rameId);
                    setAvailableRaks(raksData);
                } catch (repError) {
                    console.error('Error fetching replacement data:', repError.message);
                    // Don't fail the entire page load if remplacements can't be loaded
                    setRemplacements([]);
                }
                setError(null);
            } catch (err) {
                console.error('Erreur lors de la récupération des données:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (rameId) {
            fetchData();
        }
    }, [rameId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddReplacement = async (e) => {
        e.preventDefault();
        try {
            await createRemplacementCarte(formData);
            setSuccess('Remplacement enregistré avec succès!');
            setShowAddModal(false);
            
            // Refresh the replacement data
            const updatedReplacements = await getRemplacementsByRame(rameId);
            setRemplacements(updatedReplacements);            // Reset form
            setFormData({
                ID_CARTE_ANCIENNE: '',
                REFERENCE_CARTE: '',
                STATU_CARTE: 'Fonctionnel',
                DATE_REMPLACEMENT: new Date().toISOString().split('T')[0],
                OBSERVATIONS: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setFormData({
            ID_CARTE_ANCIENNE: '',
            ID_CARTE_NOUVELLE: '',
            DATE_REMPLACEMENT: new Date().toISOString().split('T')[0],
            OBSERVATIONS: ''
        });
        setSuccess('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            // Here you would typically handle the form submission,
            // e.g., by calling an API to create the new replacement record
            // For now, we'll just simulate a successful submission:
            setTimeout(() => {
                setSuccess('Remplacement ajouté avec succès!');
                handleCloseAddModal();
            }, 1000);
        } catch (error) {
            console.error('Error adding remplacement:', error);
            setSuccess('');
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Chargement des données...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => navigate('/rames')}
                    >
                        Retour à la liste des Rames
                    </button>
                </div>
            </div>
        );
    }

    if (!rame) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">Rame non trouvée</h3>
                    <p className="text-yellow-600">La rame demandée n'existe pas.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => navigate('/rames')}
                    >
                        Retour à la liste des Rames
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">            {/* Top Action Bar */}                    <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-700">Détails de la Rame <span className="text-gray-900">#{rame.NUMERO_RAME}</span></h1>
                <div className="flex space-x-3">
                    <button
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center text-sm border border-gray-200"
                        onClick={() => navigate('/rames')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </button>                    <button
                        className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center text-sm shadow-sm"
                        onClick={() => navigate(`/raks/${rameId}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Voir les Raks
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}            {/* Rame Info Card */}                <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <h2 className="text-lg font-semibold text-gray-800">Informations de la Rame</h2>
                </div>                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">ID</h3>
                        <p className="mt-1 font-medium text-gray-800">{rame.id}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">Numéro de Rame</h3>
                        <p className="mt-1 font-medium text-gray-800">{rame.NUMERO_RAME}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">Type de Rame</h3>
                        <p className="mt-1 font-medium text-gray-800">{rame.TYPE_RAME}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">Partie de Rame</h3>
                        <p className="mt-1 font-medium text-gray-800">{rame.PARTIE_RAME || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">Dernière Maintenance</h3>
                        <p className="mt-1 font-medium text-gray-800">{formatDate(rame.DERNIERE_MAINTENANCE)}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-blue-600">Prochaine Maintenance</h3>
                        <p className="mt-1 font-medium text-gray-800">{formatDate(rame.PROCHAINE_MAINTENANCE)}</p>
                    </div>
                </div>
            </div>            {/* Replacement History Card */}            <div className="bg-white rounded-lg shadow overflow-hidden">                <div className="bg-blue-50 px-4 py-3 flex justify-between items-center border-b border-blue-100">
                    <h2 className="text-lg font-semibold text-gray-800">Historique des Remplacements de Cartes</h2>
                    <div className="flex items-center space-x-3">
                        <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                            {remplacements.length} remplacements
                        </span>
                        <button
                            onClick={openAddModal}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-600"
                        >
                            + Ajouter
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {!remplacements || remplacements.length === 0 ? (                        <div className="text-center py-10 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                            </svg>
                            <p className="mt-2">Aucun historique de remplacement trouvé pour cette rame.</p>
                            <button                                onClick={() => navigate(`/raks/${rameId}`)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Voir les RAKs de cette rame
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">                                <thead className="text-xs bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-blue-700 font-medium">Date</th>
                                        <th className="px-4 py-2 text-blue-700 font-medium">Carte Remplacée</th>
                                        <th className="px-4 py-2 text-blue-700 font-medium">Nouvelle Carte</th>
                                        <th className="px-4 py-2 text-blue-700 font-medium">Rack</th>
                                        <th className="px-4 py-2 text-blue-700 font-medium">Observations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {remplacements.map((remplacement, index) => (                        <tr
                                            key={remplacement.id}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                        >
                                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                                                {formatDate(remplacement.DATE_REMPLACEMENT)}
                                            </td>
                                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                                                <div className="text-gray-800">{remplacement.carte_ancienne.REFERENCE_CARTE || 'N/A'}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                                                <div className="text-gray-800">{remplacement.carte_nouvelle.REFERENCE_CARTE || 'N/A'}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                                                <div className="text-gray-800">{remplacement.carte_ancienne.rak.NOM_RAK || 'N/A'}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm border-b border-gray-100">
                                                {remplacement.OBSERVATIONS || 'Aucune observation'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Replacement Card */}
            {/* <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Ajouter un Remplacement de Carte</h2>
                </div>
                <div className="p-6">
                    {success && (
                        <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Carte Ancienne</label>
                                <select
                                    name="ID_CARTE_ANCIENNE"
                                    value={formData.ID_CARTE_ANCIENNE}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Sélectionnez une carte</option>
                                    {availableCartes.map((carte) => (
                                        <option key={carte.id} value={carte.id}>
                                            {carte.REFERENCE_CARTE} - Rack: {carte.rak?.NOM_RAK}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nouvelle Carte</label>
                                <select
                                    name="ID_CARTE_NOUVELLE"
                                    value={formData.ID_CARTE_NOUVELLE}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Sélectionnez une carte</option>
                                    {availableCartes.map((carte) => (
                                        <option key={carte.id} value={carte.id}>
                                            {carte.REFERENCE_CARTE} - Rack: {carte.rak?.NOM_RAK}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date de Remplacement</label>
                            <input
                                type="date"
                                name="DATE_REMPLACEMENT"
                                value={formData.DATE_REMPLACEMENT}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Observations</label>
                            <textarea
                                name="OBSERVATIONS"
                                value={formData.OBSERVATIONS}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
                                </svg>
                                Ajouter le Remplacement
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            
            {/* Add Replacement Modal */}
            {showAddModal && (                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Ajouter un remplacement de carte</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
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
                        
                        <form onSubmit={handleAddReplacement} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Carte Ancienne</label>                                <select
                                    name="ID_CARTE_ANCIENNE"
                                    value={formData.ID_CARTE_ANCIENNE}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Sélectionner une carte</option>
                                    {availableCartes.map(carte => (
                                        <option key={carte.id} value={carte.id}>
                                            {carte.REFERENCE_CARTE} (Rack: {carte.rak?.NOM_RAK || 'N/A'})
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-blue-500 mt-1">La nouvelle carte sera créée dans le même rack que la carte ancienne.</p>
                            </div>                            <h3 className="font-bold text-gray-700 mt-4 mb-2">Nouvelle Carte</h3>                            <div className="text-sm text-blue-600 mb-2">
                                <p>La nouvelle carte sera créée dans le même rack que la carte remplacée.</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Référence de Carte</label>                                <input
                                    type="text"
                                    name="REFERENCE_CARTE"
                                    value={formData.REFERENCE_CARTE}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Entrez la référence de la nouvelle carte"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Statut</label>                                <select
                                    name="STATU_CARTE"
                                    value={formData.STATU_CARTE}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="Fonctionnel">Fonctionnel</option>
                                    <option value="En panne">En panne</option>
                                    <option value="En réparation">En réparation</option>
                                    <option value="Hors service">Hors service</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de Remplacement</label>                                <input
                                    type="date"
                                    name="DATE_REMPLACEMENT"
                                    value={formData.DATE_REMPLACEMENT}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Observations</label>                                <textarea
                                    name="OBSERVATIONS"
                                    value={formData.OBSERVATIONS}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div                                className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Annuler
                                </button>                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm shadow-sm"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RameDetails;
