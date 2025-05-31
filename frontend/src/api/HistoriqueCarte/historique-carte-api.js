import axios from '../axios';

const BASE_URL = '/historique-cartes';

export const getHistoriqueCartes = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching historique cartes:', error);
        throw error;
    }
};

export const getCarteHistory = async (carteId) => {
    try {
        const response = await axios.get(`${BASE_URL}/carte/${carteId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carte history:', error);
        throw error;
    }
};

export const createHistoriqueCarte = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating historique carte:', error);
        throw error;
    }
};

export const getHistoriqueCarteById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching historique carte by ID:', error);
        throw error;
    }
};

export const updateHistoriqueCarte = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating historique carte:', error);
        throw error;
    }
};

export const deleteHistoriqueCarte = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting historique carte:', error);
        throw error;
    }
};
