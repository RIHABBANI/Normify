import React, { useState, useEffect } from 'react';
import { createCarte, updateCarte } from '../../api/Carte/carte-api';
import { getRaks } from '../../api/Rak/rak-api';

export const CarteFormModal = ({ isOpen, onClose, onSave, initialData, isEditMode }) => {
    const [formData, setFormData] = useState({
        ID_RAK: '',
        REFERENCE_CARTE: '',
        STATU_CARTE: 'Fonctionnel' // Default status
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [raks, setRaks] = useState([]);
    const [rakLoading, setRakLoading] = useState(true);

    // Fetch raks for the dropdown
    useEffect(() => {
        const fetchRaks = async () => {
            try {
                setRakLoading(true);
                const data = await getRaks();
                setRaks(data);
            } catch (err) {
                console.error('Error fetching raks:', err);
                setError('Failed to load raks. Please try again later.');
            } finally {
                setRakLoading(false);
            }
        };

        if (isOpen) {
            fetchRaks();
        }
    }, [isOpen]);

    // If in edit mode, set the form data from initialData
    useEffect(() => {
        if (initialData && isEditMode) {
            setFormData({
                ID_RAK: initialData.ID_RAK || '',
                REFERENCE_CARTE: initialData.REFERENCE_CARTE || '',
                STATU_CARTE: initialData.STATU_CARTE || 'Fonctionnel'
            });
        } else {
            // Reset form data when not in edit mode
            setFormData({
                ID_RAK: '',
                REFERENCE_CARTE: '',
                STATU_CARTE: 'Fonctionnel'
            });
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let result;
            if (isEditMode) {
                result = await updateCarte(initialData.id, formData);
            } else {
                result = await createCarte(formData);
            }
            onSave(result);
            onClose();
        } catch (err) {
            console.error('Error saving carte:', err);
            setError(err.message || 'An error occurred while saving the carte.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {isEditMode ? 'Modifier' : 'Ajouter'} une Carte
                </h2>

                {error && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ID_RAK">
                            Rak
                        </label>
                        <select 
                            id="ID_RAK"
                            name="ID_RAK"
                            value={formData.ID_RAK} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={rakLoading}
                        >
                            <option value="">Sélectionnez un Rak</option>
                            {raks.map(rak => (
                                <option key={rak.id} value={rak.id}>
                                    {rak.NOM_RAK} (Rame: {rak.ID_RAME})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="REFERENCE_CARTE">
                            Référence
                        </label>
                        <input 
                            type="text" 
                            id="REFERENCE_CARTE"
                            name="REFERENCE_CARTE"
                            value={formData.REFERENCE_CARTE} 
                            onChange={handleChange}
                            placeholder="Entrez la référence de la carte"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="STATU_CARTE">
                            Statut
                        </label>
                        <select 
                            id="STATU_CARTE"
                            name="STATU_CARTE"
                            value={formData.STATU_CARTE} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="Fonctionnel">Fonctionnel</option>
                            <option value="En panne">En panne</option>
                            <option value="En maintenance">En maintenance</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
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
                                    Enregistrement...
                                </span>
                            ) : (
                                'Enregistrer'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarteFormModal;
