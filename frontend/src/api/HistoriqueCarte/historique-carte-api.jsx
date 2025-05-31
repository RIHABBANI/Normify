import API from '../axios';

// Function to get all HistoriqueCarte data
export const getAllHistoriqueCartes = async () => {
    try {
        const response = await API.get('/historique-cartes');
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get history for a specific carte
export const getCarteHistory = async (carteId) => {
    try {
        const response = await API.get(`/historique-cartes/carte/${carteId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to add a new HistoriqueCarte
export const createHistoriqueCarte = async (historiqueData) => {
    try {
        const response = await API.post('/historique-cartes', historiqueData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get a single HistoriqueCarte by ID
export const getHistoriqueCarteById = async (historiqueId) => {
    try {
        const response = await API.get(`/historique-cartes/${historiqueId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to update an existing HistoriqueCarte
export const updateHistoriqueCarte = async (historiqueId, historiqueData) => {
    try {
        const response = await API.put(`/historique-cartes/${historiqueId}`, historiqueData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to delete a HistoriqueCarte
export const deleteHistoriqueCarte = async (historiqueId) => {
    try {
        await API.delete(`/historique-cartes/${historiqueId}`);
        return true;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};
