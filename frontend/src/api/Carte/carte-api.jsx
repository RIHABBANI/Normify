import API from '../axios';
import { getToken } from '../User/user-api';

// Function to get all Carte data
export const getCartes = async () => {
    try {
        const response = await API.get('/cartes');
        console.log(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get all Cartes in a specific Rak
export const getCartesByRak = async (rakId) => {
    try {
        const response = await API.get(`/cartes/raks/${rakId}`);
        console.log('Cartes for Rak', rakId, ':', response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get a single Carte by ID
export const getCarteById = async (carteId) => {
    try {
        const response = await API.get(`/cartes/${carteId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to add a new Carte
export const createCarte = async (carteData) => {
    try {
        const response = await API.post('/cartes', carteData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to update an existing Carte
export const updateCarte = async (carteId, carteData) => {
    try {
        const response = await API.put(`/cartes/${carteId}`, carteData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to delete a Carte
export const deleteCarte = async (carteId) => {
    try {
        await API.delete(`/cartes/${carteId}`);
        return true;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};